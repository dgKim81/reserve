import TimeLineSpec from './TimeLineSpec';

export class FixedDateTimeLineSpec implements TimeLineSpec {
    private fixedDate: Date;

    constructor(fixedDate: Date) {
        this.fixedDate = fixedDate;
    }
    getDateAfterBaseDate(baseDate: Date): Date {
        if (this.fixedDate.getTime() <= baseDate.getTime()) {
            return this.fixedDate;
        }
        
        return new Date(0);
    }
}