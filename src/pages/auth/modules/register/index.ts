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
      type: 'email',
      name: 'email',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.loginInput = new Input({
      type: 'password',
      name: 'login',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.nameInput = new Input({
      type: 'text',
      name: 'first_name',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.secondNameInput = new Input({
      type: 'text',
      name: 'second_name',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.phoneInput = new Input({
      type: 'number',
      name: 'phone',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.passwordInput = new Input({
      type: 'password',
      name: 'password',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
    });
    this.children.passwordRepeatInput = new Input({
      type: 'password',
      name: 'passwordRepeat',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Зарегистрироваться',
      styles: {
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
