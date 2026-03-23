import { ICommandScore } from "./ICommandScore";

export class AddScore implements ICommandScore {
    private valueInitial: number;
    private setter: any;
    private toAdd: number;

    public constructor(valueInitial: number, setter: React.Dispatch<React.SetStateAction<number>>, toAdd: number) {
        this.valueInitial = valueInitial;
        this.setter = setter;
        this.toAdd = toAdd;
    }

    public execute() {
        this.setter(this.valueInitial + this.toAdd);
    }

    public rollback() {
        this.setter(this.valueInitial - this.toAdd);
    }
}