import Dexie, { Table } from 'dexie'

const version = 2

export class MyRecordDexie extends Dexie {
  works!: Table<Work, number>

  constructor() {
    super('myWorks')
    this.version(version).stores({
      works: '++id, [year+month+day], [year+month]',
    })
  }
}

export const db = new MyRecordDexie()
