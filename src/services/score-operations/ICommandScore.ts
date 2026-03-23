
export interface ICommandScore {
    execute: () => void;
    rollback: () => void;
}