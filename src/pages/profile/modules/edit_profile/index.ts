import editProfileTemplate from './edit_profile.hbs';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import Modal from '../../../../components/modal';
import Avatar from '../../../../components/avatar';

import Validator, { FieldsError } from '../../../../utils/Validator';
import Component from '../../../../utils/Component';
import { onSubmitForm } from '../../../../utils/helpers';

import avatarIcon from '../../../../../static/icons/avatarIcon.png';

interface EditProfilePageProps {
  selector?: string;
  events?: Record<string, (args: any) => void>;
}

class EditProfilePage extends Component<EditProfilePageProps> {
  constructor(props: EditProfilePageProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          onSubmitForm(e, e.srcElement, this.children);
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
      placeholder: 'pochta@gmail.com',
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
      placeholder: 'login',
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
      placeholder: 'Ivan',
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
      placeholder: 'Ivanov',
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
      placeholder: 'Ivan',
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
      placeholder: '+7(909)9673030',
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
      avatar: avatarIcon,
      withModal: true,
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
      },
      events: {
        click: () => {
          const modalElement = (this.children.modal as Component).getContent();
          if (modalElement) {
            this._showModal(modalElement);
          }
        },
      },
    });

    this.children.modal = new Modal({
      type: 'file',
      title: 'Загрузите файл',
      buttonTitle: 'Поменять',
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

  private _showModal(element: HTMLElement) {
    element.style.display = 'block';
  }

  protected render() {
    return this.compile(editProfileTemplate, { ...this.props });
  }
}

export default EditProfilePage;
