import Entity from "../contextBase/Entity";
import TimeSpan from "../domainFramework/TimeSpan";

export default class RoomTime extends Entity {
    constructor(
        id : number,
        public displayName: string,
        public times: TimeSpan[]
    ){
        super();
        this.id = id;
    };
}