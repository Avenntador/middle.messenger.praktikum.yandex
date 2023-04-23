import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import changePasswordTemplate from './change_password.hbs';

class ChangePasswordPage extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.oldPasswordInput = new Input({
      label: 'Старый пароль',
      type: 'password',
      name: 'oldPassword',
      placeholder: '*********',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.newPasswordInput = new Input({
      label: 'Новый пароль',
      type: 'password',
      name: 'newPassword',
      placeholder: '*********',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.newPasswordRepeatInput = new Input({
      label: 'Повторите новый пароль',
      type: 'password',
      name: 'newPasswordRepeat',
      placeholder: '*********',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Сохранить',
      events: {
        click: this._onSubmit,
      },
      styles: {
        button: 'profile__submit button button_contained ',
      },
    });
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    console.log('Поменял пароль');
  }

  protected render() {
    return this.compile(changePasswordTemplate, { ...this.props });
  }
}

export default ChangePasswordPage;
