import Input from '../components/input';
import Component from './Component';

export enum FieldsError {
  LOGIN = '3 до 20 символов, латиница, цифры, но не состоять из них, без пробелов, без спецсимволов (дефис и нижнее подчёркивание можно)',
  PASSWORD = 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  EMAIL = 'латиница, можно цифры и спецсимволы вроде дефиса, (@) нужен и точка после неё, перед точкой буквы.',
  NAME = 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
  PHONE = 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
}

class Validator {
  private _isValidLogin(value: string): boolean {
    const pattern = /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/;
    return pattern.test(value);
  }

  private _isValidPassword(value: string): boolean {
    const pattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    return pattern.test(value);
  }

  private _isValidEmail(value: string): boolean {
    const pattern = /.+@[^@]+[a-z]+\.[^@]{2,}$/;
    return pattern.test(value);
  }

  private _isValidPhone(value: string): boolean {
    const pattern = /^[+-d]?\d{10,15}$/;
    return pattern.test(value);
  }

  private _isValidName(value: string): boolean {
    const pattern = /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/;
    return pattern.test(value);
  }

  public validate(name: string, input: Component | Component[], value: string) {
    if (input instanceof Input) {
      if (name.includes('name')) {
        if (!this._isValidName(value)) {
          input.setValidError();

          return false;
        }
        input.setValid();
        return true;
      }

      if (name.includes('password')) {
        if (!this._isValidPassword(value)) {
          input.setValidError();

          return false;
        }
        input.setValid();
        return true;
      }

      switch (name) {
        case 'login': {
          if (!this._isValidLogin(value)) {
            input.setValidError();

            return false;
          }
          input.setValid();
          return true;
        }
        case 'email': {
          if (!this._isValidEmail(value)) {
            input.setValidError();

            return false;
          }
          input.setValid();
          return true;
        }
        case 'phone': {
          if (!this._isValidPhone(value)) {
            input.setValidError();

            return false;
          }
          input.setValid();
          return true;
        }
        default:
          break;
      }
    }

    return false;
  }
}

const validatorService = new Validator();
export default validatorService;
