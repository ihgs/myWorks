export interface Recorder {
  save(work: Work): Work
  update(work: Work): Work
  listByDay(year: number, month: number, day: number): Work[]
  listByMonth(year: number, month: number): Work[]
}
