import ValueObject from "../contextBase/ValueObject";

export default class TimeSpan extends ValueObject {
  constructor(public beginTime: Date, public endTime: Date) {
    super();

    
    if (!this.isValid()) {
      throw new Error(
        "TimeSpan이 유효하지 않음: 시작 시간은 종료 시간보다 빨라야 합니다."
      );
    }

    Object.freeze(this);
  }

  isValid(): boolean {
    return this.beginTime < this.endTime;
  }

  toString(): string {
    return `TimeSpan(begin: ${this.beginTime.toISOString()}, end: ${this.endTime.toISOString()})`;
  }
}
