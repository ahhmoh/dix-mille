export interface ValidationError {
  code: string;
  message: string;
}

export type ValidatorFunction<T> = (value: T) => ValidationError | null;

export interface ValidatorField<T> {
  value: T;
  validator?: ValidatorFunction<T>;
  error: ValidationError | null;
}

export class ValidatorService {
  public validate(fields: ValidatorField<any>[]) {
    for (const field of Object.values(fields)) {
      field.error = (field.validator && field.validator(field.value)) ?? null;
    }
  }
}

export const validatorService = new ValidatorService();
