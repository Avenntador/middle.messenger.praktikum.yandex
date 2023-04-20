import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import mainProfileTemplate from './main_profile.hbs';

interface MainProfilePageProps {
  name: string;
}

class MainProfilePage extends Component<MainProfilePageProps> {
  constructor() {
    super({
      name: 'Name',
    });
  }

  init() {
    this.children.emailInput = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      isDisabled: true,
      placeholder: 'pochta@gmail.com',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.loginInput = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'login',
      isDisabled: true,
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.nameInput = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      placeholder: 'Ivan',
      isDisabled: true,
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.secondNameInput = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      placeholder: 'Ivanov',
      isDisabled: true,
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.displayNameInput = new Input({
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      placeholder: 'Ivan',
      isDisabled: true,
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
    });
    this.children.phoneInput = new Input({
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      placeholder: '+7(909)9673030',
      isDisabled: true,
      styles: {
        label: 'profile__input',
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

  render() {
    return this.compile(mainProfileTemplate, { ...this.props });
  }
}

export default MainProfilePage;
