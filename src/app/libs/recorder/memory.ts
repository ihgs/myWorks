import { Recorder } from '@/app/interfaces'

class MemoryDB implements Recorder {
  inworks: Work[] = [
    {
      id: 1,
      year: 2021,
      month: 1,
      day: 1,
      version: 1,
      item: '正月',
      start: '12:00',
      end: '14:00',
      type: 'イベント',
    },
    {
      id: 2,
      year: 2021,
      month: 2,
      day: 2,
      version: 1,
      item: '節分？',
      start: '13:00',
      end: '16:00',
      type: 'イベント',
    },
    {
      id: 3,
      year: 2021,
      month: 3,
      day: 3,
      version: 1,
      item: 'ひなまつり',
      start: '14:00',
      end: '15:00',
      type: 'イベント',
    },
  ]

  async save(work: Work): Promise<Work> {
    const n: Work = { ...work }
    n.id = this.inworks.length + 1
    console.log(n)
    this.inworks.push(n)
    return n
  }
  async update(work: Work): Promise<Work> {
    const n = { ...work }
    return n
  }
  async listByDay(year: number, month: number, day: number): Promise<Work[]> {
    return JSON.parse(JSON.stringify(this.inworks))
  }
  async listByMonth(year: number, month: number): Promise<Work[]> {
    return JSON.parse(JSON.stringify(this.inworks))
  }
}
export { MemoryDB }
