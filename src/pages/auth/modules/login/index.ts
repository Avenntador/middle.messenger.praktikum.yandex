import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import loginTemplate from './login.hbs';

class LoginPage extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.loginInput = new Input({
      type: 'text',
      name: 'login',
      styles: {
        input: 'input input_bottom-border auth-form__input',
      },
      events: {
        focus: (e) => {
          console.log('here');
        },
      },
    });

    this.children.passowrdInput = new Input({
      type: 'password',
      name: 'password',
      styles: {
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
        click: this._onSubmit,
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

  private _onSubmit(e: Event) {
    e.preventDefault();
    console.log('onSubmit');
  }

  protected render() {
    return this.compile(loginTemplate, { ...this.props });
  }
}

export default LoginPage;
