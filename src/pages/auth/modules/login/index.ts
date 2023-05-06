import loginTemplate from './login.hbs';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import Component from '../../../../utils/Component';
import Validator, { FieldsError } from '../../../../utils/Validator';
import { onSubmitForm } from '../../../../utils/helpers';
import Router from '../../../../utils/Router';
import AuthController from '../../../../controllers/AuthController';

interface LoginPageProps {
  selector?: string;
  events?: Record<string, (args: any) => void>;
}

class LoginPage extends Component<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      selector: 'form',
      events: {
        submit: (e) => {
          onSubmitForm(e, e.srcElement, this.children, AuthController.signin.bind(AuthController));
        },
      },
    });
  }

  protected init() {
    this.children.login = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      selector: 'input',
      errorMessage: FieldsError.LOGIN,
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
      events: {
        focus: (e) => {
          Validator.validate('login', this.children.login, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('login', this.children.login, e.target?.value);
        },
      },
    });

    this.children.password = new Input({
      label: 'Пароль',
      type: 'password',
      name: 'password',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.password, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.password, e.target?.value);
        },
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Авторизоваться',
      styles: {
        button: 'button button_contained button_fullwidth auth-form__submit',
      },
    });

    this.children.registerButton = new Button({
      type: 'button',
      label: 'Нет аккаунта?',
      styles: {
        button: 'button button_outlined button_fullwidth auth-form__sign',
      },
      events: {
        click: () => Router.go('/sign-up'),
      },
    });
  }

  protected render() {
    return this.compile(loginTemplate, { ...this.props });
  }
}

export default LoginPage;
