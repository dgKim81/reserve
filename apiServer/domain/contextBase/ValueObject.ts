import _ from "lodash"

export default class ValueObject{
  constructor() {
    // 불변성을 보장하기 위해 생성 시 동결
    //Object.freeze(this);
  }

  equals(other?: this): boolean {
    if (other === null || other === undefined) {
      return false;
    }
   
    // 프로퍼티 기반 비교
    return JSON.stringify(this) === JSON.stringify(other);
  }

  clone() {
    return _.cloneDeep(this) as this;
  }
}
