import AggregateRoot from "domain/contextBase/AggregateRoot";
import TimeSpanOperator from "domain/domainFramework/TimeSpanOperator";
import MaintenanceTime from "./MaintenanceTime";

export default class Room extends AggregateRoot {
    constructor(
        roomId: number,
        public displayName: string,
        public capacity: number,
        public description: string,
        public imageUrl: string,
        public location: string,

        public maintenancesTimes: MaintenanceTime[],
    ) {
        super();
        this.id = roomId;
    }

    addMaintenanceTime(maintenanceTime: MaintenanceTime) {
        if (this.maintenancesTimes.some(mt => TimeSpanOperator.overlaps(mt.time, maintenanceTime.time))) {
            throw new Error("유지보수 시간이 겹칩니다.");
        }
        this.maintenancesTimes.push(maintenanceTime);
    }

    removeMaintenanceTime(maintenanceTimeId: number) {
        this.maintenancesTimes = this.maintenancesTimes.filter(mt => mt.id !== maintenanceTimeId);
    }

    updateMaintenanceTime(maintenanceTimeId: number, newName: string, newDescription: string) {
        const maintenanceTime = this.maintenancesTimes.find(mt => mt.id === maintenanceTimeId);
        if (!maintenanceTime) {
            throw new Error("유지보수 시간을 찾을 수 없습니다.");
        }

        maintenanceTime.displayName = newName;
        maintenanceTime.description = newDescription;
    }
}