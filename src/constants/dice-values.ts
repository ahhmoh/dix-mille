export enum DiceName {
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
}

export const Dice: Record<DiceName, Die> = {
    [DiceName.ONE]: {name: DiceName.ONE, alphanumeric: 1, valueBase: 100, valueThreeTimes: 1000},
    [DiceName.TWO]: {name: DiceName.TWO, alphanumeric: 2, valueBase: 0, valueThreeTimes: 200},
    [DiceName.THREE]: {name: DiceName.THREE, alphanumeric: 3, valueBase: 0, valueThreeTimes: 300},
    [DiceName.FOUR]: {name: DiceName.FOUR, alphanumeric: 4, valueBase: 0, valueThreeTimes: 400},
    [DiceName.FIVE]: {name: DiceName.FIVE, alphanumeric: 5, valueBase: 50, valueThreeTimes: 500},
    [DiceName.SIX]:{name: DiceName.SIX, alphanumeric: 6, valueBase: 0, valueThreeTimes: 600},
};

export interface Die {
    name: DiceName;
    alphanumeric: number;
    valueBase: number;
    valueThreeTimes: number;
}