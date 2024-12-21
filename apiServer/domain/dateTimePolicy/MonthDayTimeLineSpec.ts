import { lunar2solar, solar2lunar } from 'solarlunar';
import TimeLineSpec from "./TimeLineSpec";

export default class MonthDatTimeLineSpec implements TimeLineSpec {
    constructor(
        public month: number,
        public day: number,
        public isLunar: boolean,
        public hour: number | undefined,
        public minute: number | undefined
        ) {
            
    }

    getDateAfterBaseDate(baseDate: Date): Date {
        const bDate = this.getSolar2LunarDate(baseDate);
        const month = bDate.month;
        const day = bDate.day;

        if (month > this.month || (month === this.month && day > this.day)) {
            return this.getDate(bDate.year + 1, this.month, this.day, this.hour, this.minute); ;
        } else {
            return this.getDate(bDate.year, this.month, this.day, this.hour, this.minute); ;
        }
    }

    private getSolar2LunarDate(baseDate: Date) {

        let result = {
            year: baseDate.getFullYear(),
            month: baseDate.getMonth(),
            day: baseDate.getDate()
        }

        if (this.isLunar) {
            const lunar = solar2lunar(result.year, result.month, result.day);
            result.year = lunar.lunarYear;
            result.month = lunar.lunarMonth;
            result.day = lunar.lunarDay;
        } 
        return result;
    }

    private getDate(year: number, month: number, day: number, hour: number | undefined, minute: number | undefined): Date {
        if (this.isLunar) {
            const solar = lunar2solar(year, month, day);
            return new Date(solar.solarYear, solar.solarMonth, solar.solarDay, hour, minute);
        } else {
            return new Date(year, month, day, hour, minute);
        }
    }
}