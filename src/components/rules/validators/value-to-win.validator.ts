import { ValidatorFunction } from './validator.service';

export const valueToWinValidator: ValidatorFunction<number> = (value: number) => {
  if (value <= 0) {
    return { code: 'belowOrEqualToZero', message: 'Rentrez une valeur au dessus de zéro' };
  } else if (value % 100 !== 0) {
    return { code: 'notDivisibleBy100', message: 'Rentrez une valeur divisible par 100' };
  }

  return null;
};
