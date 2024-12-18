import TimeSpan from "../domain/reservation/TimeSpan";

describe("TimeSpan", () => {
  it("should create a valid TimeSpan object when beginTime is before endTime", () => {
    const beginTime = new Date("2024-01-01T12:00:00Z");
    const endTime = new Date("2024-01-01T13:00:00Z");

    const timeSpan = new TimeSpan(beginTime, endTime);

    expect(timeSpan.beginTime).toBe(beginTime);
    expect(timeSpan.endTime).toBe(endTime);
  });

  it("should throw an error if beginTime is not before endTime", () => {
    const beginTime = new Date("2024-01-01T14:00:00Z");
    const endTime = new Date("2024-01-01T13:00:00Z");

    expect(() => new TimeSpan(beginTime, endTime)).toThrow(
      "TimeSpan이 유효하지 않음: 시작 시간은 종료 시간보다 빨라야 합니다."
    );
  });

  it("should correctly check if a TimeSpan is valid", () => {
    const validBeginTime = new Date("2024-01-01T12:00:00Z");
    const validEndTime = new Date("2024-01-01T13:00:00Z");
    const invalidBeginTime = new Date("2024-01-01T14:00:00Z");
    const invalidEndTime = new Date("2024-01-01T13:00:00Z");

    const validTimeSpan = new TimeSpan(validBeginTime, validEndTime);
    expect(validTimeSpan.isValid()).toBe(true);

    expect(() => new TimeSpan(invalidBeginTime, invalidEndTime)).toThrow();
  });

  it("should convert TimeSpan to string correctly", () => {
    const beginTime = new Date("2024-01-01T12:00:00Z");
    const endTime = new Date("2024-01-01T13:00:00Z");

    const timeSpan = new TimeSpan(beginTime, endTime);
    const expectedString = `TimeSpan(begin: ${beginTime.toISOString()}, end: ${endTime.toISOString()})`;

    expect(timeSpan.toString()).toBe(expectedString);
  });
});
