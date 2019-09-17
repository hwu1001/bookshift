export interface Shift {
  id: string,
  area: string,
  booked: boolean,
  startTime: number,
  endTime: number
}

export interface ShiftMap { [s: string]: Shift }

export interface ShiftsState {
  shifts: ShiftMap,
  loading: boolean
}