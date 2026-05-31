import { ValidatorField } from './validators/validator.service';

export interface Rules {
  valueToWin: Rule<number>;
  saveScoreCancelsOthers: Rule<boolean>;
}

export type Rule<T> = ValidatorField<T>;
