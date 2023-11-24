import Dexie, { Table } from 'dexie'

const version = 1

export class MyRecordDexie extends Dexie {
  works!: Table<Work>

  constructor() {
    super('myWorks')
    this.version(version).stores({
      works: '++id, year, month',
    })
  }
}

export const db = new MyRecordDexie()
