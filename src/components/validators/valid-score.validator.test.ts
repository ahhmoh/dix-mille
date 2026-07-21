import { ValidScoreValidator } from './valid-score.validator';

describe(ValidScoreValidator.name, () => {
  const validator = (value: number) => ValidScoreValidator(value);

  describe('if value is not above zero', () => {
    it.each([-1, -100, 0])('should return an error', (mockValueNotPositive) => {
      const result = validator(mockValueNotPositive);

      expect(result?.code).toBe('belowOrEqualToZero');
    });
  });

  describe('if value cannot be divided by 100', () => {
    it('should return and error', () => {
      const result = validator(150);

      expect(result?.code).toBe('notDivisibleBy100');
    });
  });

  describe('if value above zero and can be divided by 100', () => {
    it.each([100, 300, 5000, 10000])('should return no error', (mockValidValue) => {
      const result = validator(mockValidValue);

      expect(result).toBeNull();
    });
  });
});
