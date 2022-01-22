import { ValidationOptions, ValidationError, Schema } from 'joi';
import { Injectable } from '../di/injectable/injectable';

const defaultOptions: ValidationOptions = {
  allowUnknown: true,
};

@Injectable('Validation')
export class Validation {
  public log(msg: string): void {
    console.log(msg);
  }

  public validate = <T>(
    payload: T,
    schema: Schema,
    throwError: boolean = true,
    options?: ValidationOptions,
  ): ValidationError | undefined => {
    const joiValidationOptions = options
      ? Object.assign({}, defaultOptions, options)
      : defaultOptions;
    const { error } = schema.validate(payload, joiValidationOptions);
    if (error && throwError) {
      throw error;
    }
    return error;
  };
}
