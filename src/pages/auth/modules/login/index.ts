import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import loginTemplate from './login.hbs';

class LoginPage extends Component {
  constructor() {
    super({});
  }

  init() {
    this.children.loginInput = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });

    this.children.loginPassword = new Input({
      label: 'Пароль',
      type: 'password',
      name: 'password',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Авторизоваться',
      styles: {
        button: 'button button_contained button_fullwidth auth-form__submit',
      },
      events: {
        click: this.onSubmit,
      },
    });

    this.children.registerButton = new Button({
      type: 'button',
      label: 'Нет аккаунта?',
      styles: {
        button: 'button button_outlined button_fullwidth auth-form__sign',
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('onSubmit');
  }

  render() {
    return this.compile(loginTemplate, { ...this.props });
  }
}

export default LoginPage;
