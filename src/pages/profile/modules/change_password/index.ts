import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import changePasswordTemplate from './change_password.hbs';

import Avatar from '../../../../components/avatar';
import avatarIcon from '../../../../../static/icons/avatarIcon.png';
import Validator, { FieldsError } from '../../../../utils/Validator';
import onSubmitForm from '../../../../utils/helpers';

interface ChangePasswordPageProps {
  selector?: string;
  events?: Record<string, (args: any) => void>;
}

class ChangePasswordPage extends Component<ChangePasswordPageProps> {
  constructor(props: ChangePasswordPageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          onSubmitForm(e, e.target, this.children);
        },
      },
    });
  }

  protected init() {
    this.children.old_password = new Input({
      label: 'Старый пароль',
      type: 'password',
      name: 'old_password',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      placeholder: '*********',
      styles: {
        label: 'profile__input',
        input: 'input input_no-border',
      },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.old_password, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.old_password, e.target?.value);
        },
      },
    });
    this.children.password = new Input({
      label: 'Новый пароль',
      type: 'password',
      name: 'password',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      placeholder: '*********',
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.password, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.password, e.target?.value);
        },
      },
    });
    this.children.password_repeat = new Input({
      label: 'Повторите новый пароль',
      type: 'password',
      name: 'password_repeat',
      selector: 'input',
      errorMessage: FieldsError.PASSWORD,
      placeholder: '*********',
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('password', this.children.password_repeat, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('password', this.children.password_repeat, e.target?.value);
        },
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
      styles: {
        button: 'profile__submit button button_contained ',
      },
    });
  }

  protected render() {
    return this.compile(changePasswordTemplate, { ...this.props });
  }
}

export default ChangePasswordPage;
