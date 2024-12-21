import cronParser, { CronDate } from 'cron-parser';
import TimeLineSpec from "./TimeLineSpec";


export default class CronTimeLineSpec implements TimeLineSpec {
    constructor(
        public cronExpression: string) {
    }

    getDateAfterBaseDate(baseDate: Date): Date {
        const nextTime = this.nextTime(baseDate);
        return nextTime;
    }

    private nextTime(date: Date): Date {
        const options = {
            currentDate: date,
            iterator: false,
            tz: 'Asia/Seoul' // 현지 시간대를 설정합니다.
        };
        const interval = cronParser.parseExpression(this.cronExpression, options);
        const cronDate = interval.next() as CronDate;
        return cronDate.toDate();
    }
}