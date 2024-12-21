import TimeSpan from "domain/domainFramework/TimeSpan";
import Entity from "../contextBase/Entity";

export default class MaintenanceTime extends Entity {
    constructor(id: number, 
        public displayName: string, 
        public description: string,
        public time: TimeSpan) {
        super();
        this.id = id;
    }
}