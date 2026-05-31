import { Rules } from './rules';
import { valueToWinValidator } from './validators/value-to-win.validator';

export const initialRules: Rules = {
  saveScoreCancelsOthers: { value: true, error: null },
  valueToWin: { value: 10000, validator: valueToWinValidator, error: null },
};
