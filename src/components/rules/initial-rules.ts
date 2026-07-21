import { ValidScoreValidator } from '../validators/valid-score.validator';
import { Rules } from './rules';

export const initialRules: Rules = {
  saveScoreCancelsOthers: { value: true, error: null },
  valueToWin: { value: 10000, validator: ValidScoreValidator, error: null },
};
