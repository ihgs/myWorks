import { Recorder } from "@/app/interfaces";

class MemoryDB implements Recorder{
    save(work: Work): Work {
        throw new Error("mmmmmm");
    }
    update(work: Work): Work {
        throw new Error("Method not implemented.");
    }
    listByDay(year: number, month: number, day: number): Work[] {
        throw new Error("Method not implemented.");
    }
    listByMonth(year: number, month: number): Work[] {
        throw new Error("Method not implemented.");
    }
}
export {MemoryDB}