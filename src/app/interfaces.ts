export interface Recorder {
  save(work: Work): Promise<Work>
  update(work: Work): Promise<Work>
  listByDay(year: number, month: number, day: number): Promise<Work[]>
  listByMonth(year: number, month: number): Promise<Work[]>
}
