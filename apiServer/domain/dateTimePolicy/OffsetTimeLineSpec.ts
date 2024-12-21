import TimeLineSpec from "./TimeLineSpec";

export type OffsetUnit = "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond";

export default class OffsetTimeLineSpec implements TimeLineSpec {
    offsetUnit: OffsetUnit;
    offset: number;
    ignoreDays: Date[];

    constructor(offsetUnit: OffsetUnit, offset: number, ignoreDays: Date[] = []) {
        this.offsetUnit = offsetUnit;
        this.offset = offset;
        this.ignoreDays = ignoreDays;
    }

    getDateAfterBaseDate(baseDate: Date): Date {
        switch (this.offsetUnit) {
            case "month":
                return this.addMonths(baseDate, this.offset);
            case "week":
                return this.addWeeks(baseDate, this.offset);
            case "day":
                return this.addDays(baseDate, this.offset);
            case "hour":
                return this.addHours(baseDate, this.offset);
            case "minute":
                return this.addHours(baseDate, this.offset);
            case "second":
                return this.addHours(baseDate, this.offset);
            case "millisecond":
                return this.addHours(baseDate, this.offset);
            default:
                throw new Error("Invalid offset unit");
        }
    }

    private addMonths(date: Date, months: number): Date {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return this.adjustForHolidays(date, result);
    }

    private addWeeks(date: Date, weeks: number): Date {
    const result = new Date(date);
        result.setDate(result.getDate() + weeks * 7);
        return this.adjustForHolidays(date, result);
    }

    private addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return this.adjustForHolidays(date, result);
    }

    private addHours(date: Date, hours: number): Date {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return this.adjustForHolidays(date, result);
    }

    private adjustForHolidays(startDate: Date,  endDate: Date): Date {
        if (this.ignoreDays && this.ignoreDays.length > 0) {
            this.ignoreDays.reduce((acc, cur) => startDate < cur && cur < endDate ? acc + 1 : acc, 0);
            endDate.setDate(endDate.getDate() + this.ignoreDays.length);
        }
        return endDate;
    }
}