export default class ValueObject {
  constructor() {
    // 불변성을 보장하기 위해 생성 시 동결
    Object.freeze(this);
  }

  equals(other?: ValueObject): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (other === this) {
      return true;
    }
    // 프로퍼티 기반 비교
    return JSON.stringify(this) === JSON.stringify(other);
  }
}
