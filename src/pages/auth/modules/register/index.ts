import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import registerTemplate from './register.hbs';

class RegisterPage extends Component {
  constructor() {
    super({});
  }

  init() {
    this.children.emailInput = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.loginInput = new Input({
      label: 'Логин',
      type: 'password',
      name: 'login',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.nameInput = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.phoneInput = new Input({
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      name: 'phone',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.passwordRepeatInput = new Input({
      label: 'Пароль (еще раз)',
      type: 'password',
      name: 'passwordRepeat',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Зарегистрироваться',
      styles: {
        button: 'button button_contained auth-form__submit',
      },
      events: {
        click: this.onSubmit,
      },
    });

    this.children.loginButton = new Button({
      type: 'button',
      label: 'Войти',
      styles: {
        button: 'button button_outlined auth-form__sign',
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('Registration submit');
  }

  render() {
    return this.compile(registerTemplate, { ...this.props });
  }
}

export default RegisterPage;
