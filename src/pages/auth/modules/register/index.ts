import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import registerTemplate from './register.hbs';
import Validator, { FieldsError } from '../../../../utils/Validator';
import onSubmitForm from '../../../../utils/helpers/onSubmit';
import Router from '../../../../utils/Router';
import AuthController from '../../../../controllers/AuthController';

interface RegisterPageProps {
  selector?: string;
  events?: Record<string, (args: any) => void>;
}

class RegisterPage extends Component<RegisterPageProps> {
  constructor() {
    super({
      selector: 'form',
      events: {
        submit: (e) => {
          onSubmitForm(e, e.srcElement, this.children, AuthController.signup.bind(AuthController));
        },
      },
    });
  }

  protected init() {
    this.children.email = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      selector: 'input',
      errorMessage: FieldsError.EMAIL,
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
      events: {
        focus: (e) => {
          Validator.validate('email', this.children.email, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('email', this.children.email, e.target?.value);
        },
      },
    });
    this.children.login = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      selector: 'input',
      errorMessage: FieldsError.LOGIN,
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
      events: {
        focus: (e) => {
          Validator.validate('login', this.children.login, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('login', this.children.login, e.target?.value);
        },
      },
    });

    this.children.first_name = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      selector: 'input',
      errorMessage: FieldsError.NAME,
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
      events: {
        focus: (e) => {
          Validator.validate('first_name', this.children.first_name, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('first_name', this.children.first_name, e.target?.value);
        },
      },
    });
    this.children.second_name = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      selector: 'input',
      errorMessage: FieldsError.NAME,
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
      events: {
        focus: (e) => {
          Validator.validate('second_name', this.children.second_name, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('second_name', this.children.second_name, e.target?.value);
        },
      },
    });
    this.children.phone = new Input({
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      selector: 'input',
      errorMessage: FieldsError.PHONE,
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
      events: {
        focus: (e) => {
          Validator.validate('phone', this.children.phone, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('phone', this.children.phone, e.target?.value);
        },
      },
    });
    this.children.password = new Input({
      label: 'Пароль',
      type: 'password',
      name: 'password',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.password, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.password, e.target?.value);
        },
      },
    });
    this.children.password_repeat = new Input({
      label: 'Пароль (еще раз)',
      type: 'password',
      name: 'password_repeat',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.password_repeat, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.password_repeat, e.target?.value);
        },
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Зарегистрироваться',
      styles: {
        label: 'input__label',
        selector: 'input',
        button: 'button button_contained button_fullwidth auth-form__submit',
      },
    });

    this.children.loginButton = new Button({
      type: 'button',
      label: 'Войти',
      styles: {
        button: 'button button_outlined button_fullwidth auth-form__sign',
      },
      events: {
        click: () => Router.go('/'),
      },
    });
  }

  protected render() {
    return this.compile(registerTemplate, { ...this.props });
  }
}

export default RegisterPage;
