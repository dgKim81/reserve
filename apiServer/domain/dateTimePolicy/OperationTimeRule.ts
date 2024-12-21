import OffsetTimeLineSpec from "./OffsetTimeLineSpec";
import TimeLineSpec from "./TimeLineSpec";

export default class OperationTimeRule {
    preDateTimeRule: OffsetTimeLineSpec | null = null;
    postDateTimeRule: OffsetTimeLineSpec | null = null;
    operationTimeRule:  TimeLineSpec | null = null;

    allDay: boolean = false;
    isOperation: boolean = true;

    priority: number = 1;
}