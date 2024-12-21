import TimeSpan from "domain/domainFramework/TimeSpan";
import TimeLine from "../domainFramework/TimeLine";
import CronTimeLineSpec from "./CronTimeLineSpec";
import MonthDatTimeLineSpec from "./MonthDayTimeLineSpec";
import OffsetTimeLineSpec, { OffsetUnit } from "./OffsetTimeLineSpec";
import OperationTimeRule from "./OperationTimeRule";

/**
 * 예약 시간에 대한 정책이다. 
 * 운영시간, 휴일, 몇일전부터 얼마까지 예약시간대를 제공할지에 대한 정책
 * (*.이쪽은 문화재단 프로젝트에 사용했던 것을 조금 정리하는 수준...)
 */
export default class TimeLinePolicy {
    // 기준일로 부터의 예약가능 시작일
    beginDateTimeRule: Map<OffsetUnit, OffsetTimeLineSpec> = new Map<OffsetUnit, OffsetTimeLineSpec>();
    // 기준일로 부터 예약가능 마지막날
    endDateTimeRule: Map<OffsetUnit, OffsetTimeLineSpec> = new Map<OffsetUnit, OffsetTimeLineSpec>();

    // 공식 휴일 규칙(휴일이라고 다 쉬는 것은 아님.)
    holydayRule: [OffsetTimeLineSpec | null, CronTimeLineSpec | MonthDatTimeLineSpec, OffsetTimeLineSpec | null][] = [];
    // 운영 일정 규칙(운영과 휴업일 규칙임)
    operationTimeRule: OperationTimeRule[] = [];
    // span의 최소 시간 간격(분)
    minTimeSpanIntervalMin: number = 30;

    reserveAbleTimeLine(beginTime: Date, endTime: Date, reservedTimes: TimeSpan[]): TimeLine
    {
        // 정책에 따라서 타임라인을 생성한다.
        // 타임 라인 정책은 
        // 운영일자 설정
        // 사용불가능 일자 설정
        // 예약된 일자
        return new TimeLine();
    }

    checkReserveTime(roomId: number, reserveTimes: TimeSpan[]): boolean
    {
        return true;
    }
}