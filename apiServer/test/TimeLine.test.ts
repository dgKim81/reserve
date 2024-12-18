import TimeSpan from "../domain/reservation/TimeSpan";
import TimeLine from "../domain/reservation/TimeLine";

describe("TimeLine", () => {
  let timeLine: TimeLine;

  beforeEach(() => {
    timeLine = new TimeLine();
  });

  describe("addTimeSpan", () => {
    it("should add a non-overlapping TimeSpan", () => {
      const timeSpan = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T13:00:00Z")
      );

      timeLine.addTimeSpan(timeSpan);

      expect(timeLine.getTimeSpans()).toEqual([timeSpan]);
    });

    it("should throw an error when adding overlapping TimeSpan", () => {
      const t1 = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T13:00:00Z")
      );
      const t2 = new TimeSpan(
        new Date("2024-01-01T12:30:00Z"),
        new Date("2024-01-01T13:30:00Z")
      );

      timeLine.addTimeSpan(t1);

      expect(() => timeLine.addTimeSpan(t2)).toThrow(
        `${t2}과 겹치는 시간대가 존재합니다.`
      );
    });
  });

  describe("removeTimeSpan", () => {
    it("should remove an existing TimeSpan", () => {
      const timeSpan = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T13:00:00Z")
      );
      timeLine.addTimeSpan(timeSpan);
      timeLine.removeTimeSpan(timeSpan);

      expect(timeLine.getTimeSpans()).toEqual([]);
    });

    it("should do nothing if the TimeSpan does not exist", () => {
      const timeSpan = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T13:00:00Z")
      );

      timeLine.removeTimeSpan(timeSpan);
      expect(timeLine.getTimeSpans()).toEqual([]);
    });
  });

  describe("fillTimeLine", () => {
    it("should fill the timeline with sorted TimeSpans", () => {
      const t1 = new TimeSpan(
        new Date("2024-01-01T14:00:00Z"),
        new Date("2024-01-01T15:00:00Z")
      );
      const t2 = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T13:00:00Z")
      );

      timeLine.fillTimeLine([t1, t2]);

      expect(timeLine.getTimeSpans()).toEqual([t2, t1]);
    });
  });

  describe("unifyTimeLine", () => {
    it("should unify two timelines", () => {
      const t1 = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T14:00:00Z")
      );
      const t2 = new TimeSpan(
        new Date("2024-01-01T13:00:00Z"),
        new Date("2024-01-01T15:00:00Z")
      );

      timeLine.addTimeSpan(t1);

      const otherTimeLine = new TimeLine();
      otherTimeLine.addTimeSpan(t2);

      const unifiedTimeLine = timeLine.unifyTimeLine(otherTimeLine);

      expect(unifiedTimeLine.getTimeSpans()).toEqual([
        new TimeSpan(
          new Date("2024-01-01T12:00:00Z"),
          new Date("2024-01-01T15:00:00Z")
        ),
      ]);
    });
  });

  describe("subtractTimeLine", () => {
    it("should subtract overlapping TimeSpans", () => {
      const t1 = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T14:00:00Z")
      );
      const t2 = new TimeSpan(
        new Date("2024-01-01T13:00:00Z"),
        new Date("2024-01-01T14:00:00Z")
      );

      timeLine.addTimeSpan(t1);

      const otherTimeLine = new TimeLine();
      otherTimeLine.addTimeSpan(t2);

      const subtractedTimeLine = timeLine.subtractTimeLine(otherTimeLine);

      expect(subtractedTimeLine.getTimeSpans()).toEqual([
        new TimeSpan(
          new Date("2024-01-01T12:00:00Z"),
          new Date("2024-01-01T13:00:00Z")
        ),
      ]);
    });
  });

  describe("inverseTimeLine", () => {
    it("should calculate the inverse timeline", () => {
      const t1 = new TimeSpan(
        new Date("2024-01-01T12:00:00Z"),
        new Date("2024-01-01T13:00:00Z")
      );
      const t2 = new TimeSpan(
        new Date("2024-01-01T14:00:00Z"),
        new Date("2024-01-01T15:00:00Z")
      );

      timeLine.fillTimeLine([t1, t2]);

      const inverseTimeLine = timeLine.inverseTimeLine(
        new Date("2024-01-01T11:00:00Z"),
        new Date("2024-01-01T16:00:00Z")
      );

      expect(inverseTimeLine.getTimeSpans()).toEqual([
        new TimeSpan(
          new Date("2024-01-01T11:00:00Z"),
          new Date("2024-01-01T12:00:00Z")
        ),
        new TimeSpan(
          new Date("2024-01-01T13:00:00Z"),
          new Date("2024-01-01T14:00:00Z")
        ),
        new TimeSpan(
          new Date("2024-01-01T15:00:00Z"),
          new Date("2024-01-01T16:00:00Z")
        ),
      ]);
    });
  });
});
