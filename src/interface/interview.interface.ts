export enum SlotStatus {
  FULL = 'FULL',
  ALMOST_FULL = 'ALMOST_FULL',
  AVAILABLE = 'AVAILABLE',
}

export interface TimeSlot {
  id: string;
  time: string;
  type: 'morning' | 'afternoon';
  slotsAvailable: number;
  status: SlotStatus;
  selected?: boolean;
}

export interface DaySchedule {
  date: number;
  day: string;
  month: number;
  slots: TimeSlot[];
}

export interface DailyAvailabilityDto {
  date: string;
  morning: { slot: number; status: SlotStatus };
  afternoon: { slot: number; status: SlotStatus };
}

export interface ExamSlotsReportDto {
  days: DailyAvailabilityDto[];
}
