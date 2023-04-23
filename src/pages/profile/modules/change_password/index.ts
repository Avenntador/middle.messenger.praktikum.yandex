import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import changePasswordTemplate from './change_password.hbs';

import Avatar from '../../../../components/avatar';
import avatarIcon from '../../../../../static/icons/avatarIcon.png';

class ChangePasswordPage extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.oldPasswordInput = new Input({
      type: 'password',
      name: 'oldPassword',
      placeholder: '*********',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.newPasswordInput = new Input({
      type: 'password',
      name: 'newPassword',
      placeholder: '*********',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.newPasswordRepeatInput = new Input({
      type: 'password',
      name: 'newPasswordRepeat',
      placeholder: '*********',
      styles: {
        input: 'input input_no-border',
      },
    });

    this.children.avatar = new Avatar({
      avatar: avatarIcon,
      withModal: false,
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
      },
      events: {},
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
