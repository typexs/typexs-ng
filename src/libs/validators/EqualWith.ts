import {registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';


export function EqualWith(refPropertyName: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'equalWith',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value && args.object[propertyName] === value;
        }
      }
    });
  };
}
