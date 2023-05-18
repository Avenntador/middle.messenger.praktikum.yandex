import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import mainProfileTemplate from './main_profile.hbs';

import Avatar from '../../../../components/avatar';
import Router from '../../../../utils/Router';
import { User } from '../../../../api/AuthAPI';
import AuthController from '../../../../controllers/AuthController';
import { withStore } from '../../../../utils/Store';

type MainProfilePageProps = User;

class MainProfile extends Component<MainProfilePageProps> {
  constructor(props: MainProfilePageProps) {
    super({ ...props });
  }

  protected init() {
    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      withModal: false,
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
      },
      events: {},
    });

    this.children.email = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      selector: 'input',
      isDisabled: true,
      placeholder: this.props.email,
      styles: { label: 'profile__input', input: 'input input_no-border' },
    });
    this.children.login = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      selector: 'input',
      placeholder: this.props.login,
      isDisabled: true,
      styles: { label: 'profile__input', input: 'input input_no-border' },
    });
    this.children.first_name = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      selector: 'input',
      placeholder: this.props.first_name,
      isDisabled: true,
      styles: { label: 'profile__input', input: 'input input_no-border' },
    });
    this.children.second_name = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      selector: 'input',
      placeholder: this.props.second_name,
      isDisabled: true,
      styles: { label: 'profile__input', input: 'input input_no-border' },
    });
    this.children.display_name = new Input({
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      selector: 'input',
      placeholder: this.props.display_name,
      isDisabled: true,
      styles: { label: 'profile__input', input: 'input input_no-border' },
    });
    this.children.phone = new Input({
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      selector: 'input',
      placeholder: this.props.phone,
      isDisabled: true,
      styles: { label: 'profile__input', input: 'input input_no-border' },
    });

    this.children.changeInfoButton = new Button({
      type: 'button',
      label: 'Изменить данные',
      styles: {
        button: 'button button_outlined',
      },
      events: {
        click: () => Router.go('/settings-edit'),
      },
    });
    this.children.changePasswordButton = new Button({
      type: 'button',
      label: 'Изменить пароль',
      styles: {
        button: 'button button_outlined',
      },
      events: {
        click: () => Router.go('/settings-change-password'),
      },
    });
    this.children.logoutButton = new Button({
      type: 'button',
      label: 'Выйти',
      styles: {
        button: 'button button_outlined button_warning',
      },
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
  }

  protected componentDidUpdate(
    _oldProps: MainProfilePageProps,
    _newProps: MainProfilePageProps,
  ): boolean {
    if (_newProps) {
      (this.children.avatar as Avatar).setProps({
        avatar: _newProps?.avatar,
      });

      Object.keys(_newProps).forEach((key) => {
        if (this.children[key] instanceof Input) {
          if (_newProps) {
            (this.children[key] as Input).setProps({
              placeholder: _newProps[key as keyof User],
            });
          }
        }
      });
    }

    return false;
  }

  protected render() {
    return this.compile(mainProfileTemplate, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.currentUser }));

// eslint-disable-next-line import/prefer-default-export
export const MainProfilePage = withUser(MainProfile);
