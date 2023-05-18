import editProfileTemplate from './edit_profile.hbs';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import Modal from '../../../../components/modal';
import Avatar from '../../../../components/avatar';

import Validator, { FieldsError } from '../../../../utils/Validator';
import Component from '../../../../utils/Component';
import onSubmitForm from '../../../../utils/helpers/onSubmit';

import UserController from '../../../../controllers/UserController';
import { withStore } from '../../../../utils/Store';
import { User } from '../../../../api/AuthAPI';

interface EditProfilePageProps extends User {
  selector?: string;
  events?: Record<string, (args: any) => void>;
}

class EditProfile extends Component<EditProfilePageProps> {
  constructor(props: EditProfilePageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          onSubmitForm(
            e,
            e.srcElement,
            this.children,
            UserController.changeProfile.bind(UserController),
          );

          this._hideModal();
        },
      },
    });
  }

  protected init() {
    this.children.email = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      selector: 'input',
      errorMessage: FieldsError.EMAIL,
      value: this.props.email,
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('email', this.children.email, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('email', this.children.email, e.target?.value);
        },
      },
    });
    this.children.login = new Input({
      label: 'Логин',
      type: 'text',
      name: 'login',
      value: this.props.login,
      selector: 'input',
      errorMessage: FieldsError.LOGIN,
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('login', this.children.login, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('login', this.children.login, e.target?.value);
        },
      },
    });
    this.children.first_name = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      value: this.props.first_name,
      selector: 'input',
      errorMessage: FieldsError.NAME,
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('first_name', this.children.first_name, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('first_name', this.children.first_name, e.target?.value);
        },
      },
    });
    this.children.second_name = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      value: this.props.second_name,
      selector: 'input',
      errorMessage: FieldsError.NAME,
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('second_name', this.children.second_name, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('second_name', this.children.second_name, e.target?.value);
        },
      },
    });
    this.children.display_name = new Input({
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      value: this.props.display_name,
      selector: 'input',
      errorMessage: FieldsError.NAME,
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('name', this.children.display_name, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('name', this.children.display_name, e.target?.value);
        },
      },
    });
    this.children.phone = new Input({
      label: 'Телефон',
      type: 'number',
      name: 'phone',
      value: this.props.phone,
      selector: 'input',
      errorMessage: FieldsError.PHONE,
      styles: { label: 'profile__input', input: 'input input_no-border' },
      events: {
        focus: (e) => {
          Validator.validate('phone', this.children.phone, e.target?.value);
        },
        blur: (e) => {
          Validator.validate('phone', this.children.phone, e.target?.value);
        },
      },
    });

    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      withModal: true,
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
      },
      events: {
        click: () => {
          this._showModal();
        },
      },
    });

    this.children.modal = new Modal({
      isFile: true,
      title: 'Загрузите файл',
      buttonTitle: 'Поменять',
      submitCallback: UserController.changeAvatar.bind(UserController),
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Сохранить',
      styles: {
        button: 'profile__submit button button_contained',
      },
    });

    this._initModalListeners(this.children.modal.getContent());
  }

  private _initModalListeners(element: HTMLElement | null) {
    const currentModal = element;
    if (currentModal) {
      document.body.addEventListener('click', (e) => {
        if (e.target === element) {
          currentModal.style.display = 'none';
        }
      });
    }
  }

  private _showModal() {
    const modalElement = (this.children.modal as Component).getContent();
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  private _hideModal() {
    const modalElement = (this.children.modal as Component).getContent();
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  protected componentDidUpdate(
    _oldProps: EditProfilePageProps,
    _newProps: EditProfilePageProps,
  ): boolean {
    (this.children.avatar as Avatar).setProps({
      avatar: _newProps?.avatar,
    });

    Object.keys(_newProps).forEach((key) => {
      if (this.children[key] instanceof Input) {
        if (_newProps) {
          (this.children[key] as Input).setProps({
            value: _newProps[key as keyof User] as string,
          });
        }
      }
    });

    return false;
  }

  protected render() {
    return this.compile(editProfileTemplate, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.currentUser }));

// eslint-disable-next-line import/prefer-default-export
export const EditProfilePage = withUser(EditProfile);
