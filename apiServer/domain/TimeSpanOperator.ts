import TimeSpan from "./TimeSpan";

export default class TimeSpanOperator {
  static merge(t1: TimeSpan, t2: TimeSpan) {
    TimeSpanOperator.validForException(t1);
    TimeSpanOperator.validForException(t2);

    if (!TimeSpanOperator.overlaps(t1, t2)) {
      throw Error(`t1(${t1})과 t2(${t2}) TimeSpan 객체는 겹치지 않습니다.`);
    }

    const beginTime = t1.beginTime < t2.beginTime ? t1.beginTime : t2.beginTime;
    const endTime = t1.endTime < t2.endTime ? t2.endTime : t1.endTime;
    
    return new TimeSpan(beginTime, endTime);
  }

  static split(t1: TimeSpan, t2: TimeSpan) {
    TimeSpanOperator.validForException(t1);
    TimeSpanOperator.validForException(t2);

    const resultTimeSpans: TimeSpan[] = [];
    if (t1.equals(t2)) {
      return resultTimeSpans;
    }

    if (!TimeSpanOperator.overlaps(t1, t2)) {
      throw Error(`t1(${t1})과 t2(${t2}) TimeSpan 객체는 겹치지 않습니다.`);
    }

    if (t1.beginTime < t2.beginTime && t1.endTime > t2.beginTime) {
      // t2의 시작 시간이 t1의 사이에 있는 경우
      const lTimeSpan = new TimeSpan(t1.beginTime, t2.beginTime);
      resultTimeSpans.push(lTimeSpan);
    }

    if (t1.beginTime < t2.endTime && t1.endTime > t2.endTime) {
      // t2의 종료 시간이 t1의 사이에 있는 경우.
      const lTimeSpan = new TimeSpan(t2.endTime, t1.endTime);
      resultTimeSpans.push(lTimeSpan);
    }

    return resultTimeSpans;
  }

  static overlaps(t1: TimeSpan, t2: TimeSpan) {
    return !(t1.endTime < t2.beginTime || t1.beginTime > t2.endTime);
  }

  static compare(t1: TimeSpan, t2: TimeSpan) {
    if (TimeSpanOperator.overlaps(t1, t2)) {
        return 0;
    }

    if (t1.endTime < t2.beginTime) {
        return -1;
    } else {
        return 1;
    }
  }

  private static validForException(t1: TimeSpan) {
    if (!t1.isValid()) {
        throw new Error(`${t1} TimeSpan 객체가 유효하지 않습니다.`);
    }
  }

  
}
