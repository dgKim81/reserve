import TimeSpan from "./TimeSpan";
import TimeSpanOperator from "../policy/TimeSpanOperator";

/**
 * 예약 시간을 계산하기 위한 타임라인 객체
 */
export default class TimeLine {
    private timeSpans: TimeSpan[] = [];
    constructor() {

    }

    /**
     * 시간대를 추가한다.
     * @param span 추가할 시간대 
     */
    addTimeSpan(span: TimeSpan) {
        const oTimeSpan: TimeSpan[] = this.timeSpans.filter(v => TimeSpanOperator.overlaps(span,v));

        if (oTimeSpan.length > 0) {
            throw new Error(`${span}과 겹치는 시간대가 존재합니다.`);
        }

        const lTimeSpan: TimeSpan[] = this.timeSpans.filter(v => v.endTime < span.beginTime && !TimeSpanOperator.overlaps(span,v));
        const rTimeSpan: TimeSpan[] = this.timeSpans.filter(v => v.beginTime > span.endTime && !TimeSpanOperator.overlaps(span,v));
        
        this.timeSpans = [...lTimeSpan, span, ...rTimeSpan];
    }

    /**
     * 시간대를 제거한다.(Value Object 이므로 값이 같은지 여부를 확인한다.)
     * @param span 제거 시간대
     */
    removeTimeSpan(span: TimeSpan) {
        const findedIdx = this.timeSpans.findIndex(v => v.equals(span));
        if (findedIdx === -1) {
            console.warn("TimeSpan not found in the timeline.");
            return;
        }
        this.timeSpans.splice(findedIdx, 1);
    }

    /**
     * 시간대를 반환한다.
     * @returns 보유한 시간대
     */
    getTimeSpans() {
        return this.timeSpans.map(v => new TimeSpan(v.beginTime, v.endTime));
    }

    /**
     * 시간대를 저장한다.
     * @param timeSpans 새로운 시간대
     */
    fillTimeLine(timeSpans: TimeSpan[]) {
        this.timeSpans = [];

        for (const timespan of timeSpans.sort(TimeSpanOperator.compare)) {
            const span = new TimeSpan(timespan.beginTime, timespan.endTime);
            this.timeSpans.push(span);
        }
    }

    /**
     * 현재 타임라인에 outer 타임라인을 병합한다.
     * @param other 병합 대상 타임라인
     * @returns 병합 된 타임라인(ex: 1~4, 3~6의 시간대가 존재하면 1~6의 시간대로 저장된다.)
     */
    unifyTimeLine(other: TimeLine) {
        const thisSpans = this.getTimeSpans();
        const otherSpans = other.getTimeSpans();

        const newSpans:TimeSpan[] = [];

        let i = 0, j = 0;
        let lEle : TimeSpan | null = null;
        let rEle : TimeSpan | null = null;

        while (i < thisSpans.length || j < otherSpans.length)
        {   
            if (i < thisSpans.length) {
                lEle = lEle ?? thisSpans[i++];
            }
            if (j < otherSpans.length) {
                rEle = rEle ?? otherSpans[j++];
            }

            if (!lEle) {
                newSpans.push(rEle!);
                rEle = null;
            } else if (!rEle) {
                newSpans.push(lEle!);
                lEle = null;
            } else {
                const c = TimeSpanOperator.compare(lEle, rEle);
                if (c === -1) {
                    newSpans.push(new TimeSpan(lEle.beginTime, lEle.endTime));
                    lEle = null;
                } else if (c === 1) {
                    newSpans.push(new TimeSpan(rEle.beginTime, rEle.endTime));
                    rEle = null;
                } else {
                    newSpans.push(TimeSpanOperator.merge(lEle, rEle));
                    lEle = null;
                    rEle = null;
                }
            }
        }

        const result: TimeLine = new TimeLine();
        result.fillTimeLine(newSpans);

        return result;
    }

    /**
     * 현재 시간대에 other 타임라인을 뺀다.
     * @param other 뺄 타임라인
     * @returns 연산 결과 타임라인
     */
    subtractTimeLine(other: TimeLine) {
        const thisSpans = this.getTimeSpans();
        const otherSpans = other.getTimeSpans();

        const newSpans:TimeSpan[] = [];
        let j = 0;
        for (let i = 0; i < thisSpans.length; i++) {
            let element: TimeSpan | null = thisSpans[i];
            
            while (j < otherSpans.length && TimeSpanOperator.compare(element, otherSpans[j]) < 1) {
                if (TimeSpanOperator.compare(element, otherSpans[j]) === 0) {
                    const splitTimeSpan = TimeSpanOperator.split(element, otherSpans[j]);
                    if (splitTimeSpan.length > 0) {
                        newSpans.push(...splitTimeSpan);
                        element = null;
                        break;
                    }
                }
                j++;
            }

            if (element != null)
                newSpans.push(new TimeSpan(element.beginTime, element.endTime));
        }

        const result: TimeLine = new TimeLine();
        result.fillTimeLine(newSpans);

        return result;
    }
    
    /**
     * 비어 있는 시간대의 타임라인을 계산한다.
     * @param beginTime 시작 시간(null이면 가장 작은 시간대의 시작시간)
     * @param endTime 종료 시간(null이면 가장 큰 시간대의 종료시간)
     * @returns 현재 설정된 타임라임의 비어있는 시간대를 가지는 타임라인
     */
    inverseTimeLine(beginTime: Date | undefined, endTime: Date | undefined) {
        const thisSpans = this.getTimeSpans();

        if (thisSpans.length === 0) {
            return new TimeLine(); // 비어 있는 경우 빈 TimeLine 반환
        }

        // 정렬 되었다고 가정함.
        const minBeginDate = beginTime || thisSpans[0].beginTime;
        const maxEndDate = endTime || thisSpans[thisSpans.length - 1].endTime;

        let baseTimeSpan: TimeSpan | null = new TimeSpan(minBeginDate, maxEndDate);
        const newSpans:TimeSpan[] = [];
    
        for (let i = 0; i < thisSpans.length; i++) {
            const element = thisSpans[i];
            if (baseTimeSpan === null) break;

            const splitTimeSpan = TimeSpanOperator.split(baseTimeSpan, element);
            if (splitTimeSpan.length === 2) {
                baseTimeSpan = splitTimeSpan[1];
                newSpans.push(splitTimeSpan[0]);
            } else if(splitTimeSpan.length === 1) {
                baseTimeSpan = splitTimeSpan[0];
            } else {
                baseTimeSpan = null;
            }
        }

        if (baseTimeSpan != null) {
            newSpans.push(baseTimeSpan);
        }

        const result: TimeLine = new TimeLine();
        result.fillTimeLine(newSpans);

        return result;
    }
}