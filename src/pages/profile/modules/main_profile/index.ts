import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import mainProfileTemplate from './main_profile.hbs';

import Avatar from '../../../../components/avatar';
import avatarIcon from '../../../../../static/icons/avatarIcon.png';

interface MainProfilePageProps {
  name: string;
}

class MainProfilePage extends Component<MainProfilePageProps> {
  constructor() {
    super({
      name: 'Name',
    });
  }

  protected init() {
    this.children.avatar = new Avatar({
      avatar: avatarIcon,
      withModal: false,
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
      },
      events: {},
    });

    this.children.emailInput = new Input({
      type: 'email',
      name: 'email',
      isDisabled: true,
      placeholder: 'pochta@gmail.com',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.loginInput = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'login',
      isDisabled: true,
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.nameInput = new Input({
      type: 'text',
      name: 'first_name',
      placeholder: 'Ivan',
      isDisabled: true,
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.secondNameInput = new Input({
      type: 'text',
      name: 'second_name',
      placeholder: 'Ivanov',
      isDisabled: true,
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.displayNameInput = new Input({
      type: 'text',
      name: 'display_name',
      placeholder: 'Ivan',
      isDisabled: true,
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.phoneInput = new Input({
      type: 'number',
      name: 'phone',
      placeholder: '+7(909)9673030',
      isDisabled: true,
      styles: {
        input: 'input input_no-border',
      },
    });

    this.children.changeInfoButton = new Button({
      type: 'button',
      label: 'Изменить данные',
      styles: {
        button: 'button button_outlined',
      },
    });
    this.children.changePasswordButton = new Button({
      type: 'button',
      label: 'Изменить пароль',
      styles: {
        button: 'button button_outlined',
      },
    });
    this.children.logoutButton = new Button({
      type: 'button',
      label: 'Выйти',
      styles: {
        button: 'button button_outlined button_warning',
      },
    });
  }

  protected render() {
    return this.compile(mainProfileTemplate, { ...this.props });
  }
}

export default MainProfilePage;
