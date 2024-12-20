import TimeSpan from "domain/domainFramework/TimeSpan";

export default class RoomTime {
    constructor(
        public roomId: number,
        public displayName: string,
        public times: TimeSpan[]
    ){ };
}