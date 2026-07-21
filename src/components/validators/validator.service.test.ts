import { ValidationError, ValidatorField, ValidatorService } from './validator.service';

describe(ValidatorService.name, () => {
  describe('validator is ok', () => {
    it('should set field error to null', () => {
      const service = new ValidatorService();
      const mockValidatorFunction = jest.fn().mockReturnValue(null);
      const mockFields: ValidatorField<any>[] = [
        { value: 'mock-value-1', validator: mockValidatorFunction, error: null },
        { value: 'mock-value-2', validator: mockValidatorFunction, error: null },
      ];

      service.validate(mockFields);

      expect(mockFields[0].error).toBeNull();
      expect(mockFields[1].error).toBeNull();
    });
  });

  describe('validator is not ok', () => {
    it('should set field error with received error', () => {
      const service = new ValidatorService();
      const mockError: ValidationError = { code: 'mock-code', message: 'mock-message' };
      const mockValidatorFunction = jest.fn().mockReturnValue(mockError);
      const mockFields: ValidatorField<any>[] = [
        { value: 'mock-value-1', validator: mockValidatorFunction, error: null },
        { value: 'mock-value-2', validator: mockValidatorFunction, error: null },
      ];

      service.validate(mockFields);

      expect(mockFields[0].error).toBe(mockError);
      expect(mockFields[1].error).toBe(mockError);
    });
  });
});
