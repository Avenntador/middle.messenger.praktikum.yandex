import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import registerTemplate from './register.hbs';

class RegisterPage extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.emailInput = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      selector: 'input',
      styles: {
        label: 'input__label',
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.loginInput = new Input({
      label: 'Логин',
      type: 'password',
      name: 'login',
      selector: 'input',
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
    });
    this.children.nameInput = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      selector: 'input',
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
    });
    this.children.secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      selector: 'input',
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
    });
    this.children.phoneInput = new Input({
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      selector: 'input',
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
    });
    this.children.passwordInput = new Input({
      label: 'Пароль',
      type: 'password',
      name: 'password',
      selector: 'input',
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
    });
    this.children.passwordRepeatInput = new Input({
      label: 'Пароль (еще раз)',
      type: 'password',
      name: 'passwordRepeat',
      selector: 'input',
      styles: { label: 'input__label', input: 'input input_bottom-border auth-form__input' },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Зарегистрироваться',
      styles: {
        label: 'input__label',
        selector: 'input',
        button: 'button button_contained button_fullwidth auth-form__submit',
      },
      events: {
        click: this._onSubmit,
      },
    });

    this.children.loginButton = new Button({
      type: 'button',
      label: 'Войти',
      styles: {
        button: 'button button_outlined button_fullwidth auth-form__sign',
      },
    });
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    console.log('Registration submit');
  }

  protected render() {
    return this.compile(registerTemplate, { ...this.props });
  }
}

export default RegisterPage;
