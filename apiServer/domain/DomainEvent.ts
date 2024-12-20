export default interface DomainEvent<T = any> {
    name: string; // 이벤트 이름
    payload: T; // 이벤트 데이터
    occurredAt: Date; // 발생 시간
  }