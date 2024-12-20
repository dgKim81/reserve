import TimeLine from "../domainFramework/TimeLine";

/**
 * 예약 시간에 대한 정책이다. 
 * 운영시간, 휴일, 몇일전부터 얼마까지 예약시간대를 제공할지에 대한 정책
 */
export default class TimeLinePolicy {
    // 기준일로 부터의 예약가능 시작일
    beginDateTimeRule: any; // 구체적으로 정하지 못했음.
    // 기준일로 부터 예약가능 마지막날
    endDateTimeRule: any;    
    // span의 최소 시간 간격
    minTimeSpanIntervalMin: number = 10;

    reserveAbleTimeLine(roomId: number, baseDate: Date): TimeLine
    {
        // 정책에 따라서 타임라인을 생성한다.
        // 타임 라인 정책은 
        // 운영일자 설정
        // 사용불가능 일자 설정
        // 예약된 일자
        return new TimeLine();
    }
}