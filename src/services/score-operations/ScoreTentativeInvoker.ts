import { ICommandScore } from "./ICommandScore";

export class ScoreTentativeInvoker {
    private history: ICommandScore[] = [];

    public execute(command: ICommandScore): void {
        if(!command) {
            return;
        }

        this.history.push(command);
        command.execute();
    }

    public rollback() {
        if(this.history.length === 0) {
            return;
        }

        this.history.pop()?.rollback();
    }
};

export const scoreTentativeInvoker = new ScoreTentativeInvoker();