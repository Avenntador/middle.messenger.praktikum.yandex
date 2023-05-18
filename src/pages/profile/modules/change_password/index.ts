import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import changePasswordTemplate from './change_password.hbs';

import Avatar from '../../../../components/avatar';
import Validator, { FieldsError } from '../../../../utils/Validator';
import onSubmitForm from '../../../../utils/helpers/onSubmit';

import UserController from '../../../../controllers/UserController';
import { withStore } from '../../../../utils/Store';
import { User } from '../../../../api/AuthAPI';

interface ChangePasswordPageProps extends User {
  selector?: string;
  events?: Record<string, (args: any) => void>;
}

class ChangePassword extends Component<ChangePasswordPageProps> {
  constructor(props: ChangePasswordPageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          onSubmitForm(
            e,
            e.srcElement,
            this.children,
            UserController.changePassword.bind(UserController),
          );
        },
      },
    });
  }

  protected init() {
    this.children.oldPassword = new Input({
      label: 'Старый пароль',
      type: 'password',
      name: 'oldPassword',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      placeholder: '*********',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.oldPassword, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.oldPassword, e.target?.value);
        },
      },
    });
    this.children.newPassword = new Input({
      label: 'Новый пароль',
      type: 'password',
      name: 'newPassword',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      placeholder: '*********',
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.newPassword, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.newPassword, e.target?.value);
        },
      },
    });
    this.children.newPassword_repeat = new Input({
      label: 'Повторите новый пароль',
      type: 'password',
      name: 'newPassword_repeat',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      placeholder: '*********',
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.newPassword_repeat, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.newPassword_repeat, e.target?.value);
        },
      },
    });

    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      withModal: false,
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
      },
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Сохранить',
      styles: {
        button: 'profile__submit button button_contained ',
      },
    });
  }

  protected render() {
    return this.compile(changePasswordTemplate, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.currentUser }));

// eslint-disable-next-line import/prefer-default-export
export const ChangePasswordPage = withUser(ChangePassword);
