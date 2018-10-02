import {TWeekday} from './types';

export interface ISchedule {
  weekday?: TWeekday;
  date?: string;
  availableHours: Array<string>;
}
