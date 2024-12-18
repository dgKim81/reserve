import TimeSpan from "../domain/TimeSpan";
import TimeSpanOperator from "../domain/TimeSpanOperator";

describe("TimeSpanOperator", () => {
  const t1 = new TimeSpan(new Date("2024-01-01T12:00:00Z"), new Date("2024-01-01T14:00:00Z"));
  const t2 = new TimeSpan(new Date("2024-01-01T13:00:00Z"), new Date("2024-01-01T15:00:00Z"));
  const t3 = new TimeSpan(new Date("2024-01-01T16:00:00Z"), new Date("2024-01-01T18:00:00Z"));

  describe("merge", () => {
    it("should merge two overlapping TimeSpan objects", () => {
      const merged = TimeSpanOperator.merge(t1, t2);
      expect(merged.beginTime).toEqual(new Date("2024-01-01T12:00:00Z"));
      expect(merged.endTime).toEqual(new Date("2024-01-01T15:00:00Z"));
    });

    it("should throw an error when TimeSpan objects do not overlap", () => {
      expect(() => TimeSpanOperator.merge(t1, t3)).toThrow(
        `t1(${t1})과 t2(${t3}) TimeSpan 객체는 겹치지 않습니다.`
      );
    });
  });

  describe("split", () => {
    it("should return empty array when TimeSpan objects are equal", () => {
      const splitResult = TimeSpanOperator.split(t1, t1);
      expect(splitResult).toEqual([]);
    });

    it("should split TimeSpan objects correctly when overlapping", () => {
      const splitResult = TimeSpanOperator.split(t1, t2);
      expect(splitResult.length).toBe(1);
      expect(splitResult[0].beginTime).toEqual(new Date("2024-01-01T12:00:00Z"));
      expect(splitResult[0].endTime).toEqual(new Date("2024-01-01T13:00:00Z"));
    });

    it("should throw an error when TimeSpan objects do not overlap", () => {
      expect(() => TimeSpanOperator.split(t1, t3)).toThrow(
        `t1(${t1})과 t2(${t3}) TimeSpan 객체는 겹치지 않습니다.`
      );
    });
  });

  describe("overlaps", () => {
    it("should return true for overlapping TimeSpan objects", () => {
      expect(TimeSpanOperator.overlaps(t1, t2)).toBe(true);
    });

    it("should return false for non-overlapping TimeSpan objects", () => {
      expect(TimeSpanOperator.overlaps(t1, t3)).toBe(false);
    });
  });

  describe("compare", () => {
    it("should return 0 for overlapping TimeSpan objects", () => {
      expect(TimeSpanOperator.compare(t1, t2)).toBe(0);
    });

    it("should return -1 when t1 ends before t2 begins", () => {
      expect(TimeSpanOperator.compare(t1, t3)).toBe(-1);
    });

    it("should return 1 when t1 begins after t2 ends", () => {
      expect(TimeSpanOperator.compare(t3, t1)).toBe(1);
    });
  });

  it("should throw an error for invalid TimeSpan objects", () => {
    expect(() => {
      new TimeSpan(
        new Date("2024-01-01T14:00:00Z"), 
        new Date("2024-01-01T12:00:00Z")
      );
    }).toThrow("TimeSpan이 유효하지 않음: 시작 시간은 종료 시간보다 빨라야 합니다.");
  });
});
