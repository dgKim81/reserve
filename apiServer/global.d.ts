declare module 'solarlunar' {
    export interface SolarLunarDate {
      solarYear: number;
      solarMonth: number;
      solarDay: number;
      lunarYear: number;
      lunarMonth: number;
      lunarDay: number;
      isLeap: boolean;
      term: string;
      chineseZodiac: string;
      ganzhiYear: string;
      ganzhiMonth: string;
      ganzhiDay: string;
    }
  
    export function solar2lunar(
      year: number,
      month: number,
      day: number
    ): SolarLunarDate;
  
    export function lunar2solar(
      year: number,
      month: number,
      day: number,
      isLeapMonth?: boolean
    ): SolarLunarDate;
  }
  