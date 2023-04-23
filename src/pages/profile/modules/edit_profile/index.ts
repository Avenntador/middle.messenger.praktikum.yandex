import Component from '../../../../utils/Component';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import editProfileTemplate from './edit_profile.hbs';
import Modal from '../../../../components/modal';

import avatarIcon from '../../../../../static/icons/avatarIcon.png';
import Avatar from '../../../../components/avatar';

class EditProfilePage extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.emailInput = new Input({
      type: 'email',
      name: 'email',
      placeholder: 'pochta@gmail.com',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.loginInput = new Input({
      type: 'text',
      name: 'login',
      placeholder: 'login',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.nameInput = new Input({
      type: 'text',
      name: 'first_name',
      placeholder: 'Ivan',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.secondNameInput = new Input({
      type: 'text',
      name: 'second_name',
      placeholder: 'Ivanov',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.displayNameInput = new Input({
      type: 'text',
      name: 'display_name',
      placeholder: 'Ivan',
      styles: {
        input: 'input input_no-border',
      },
    });
    this.children.phoneInput = new Input({
      type: 'number',
      name: 'phone',
      placeholder: '+7(909)9673030',
      styles: {
        input: 'input input_no-border',
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
      type: false,
      title: 'Загрузите файл',
      buttonTitle: 'Поменять',
    });

    this.children.submitButton = new Button({
      type: 'submit',
      label: 'Сохранить',
      events: {
        click: this._onSubmit,
      },
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

  private _onSubmit(e: Event) {
    e.preventDefault();
    console.log('Поменял профиль');
  }

  protected render() {
    return this.compile(editProfileTemplate, { ...this.props });
  }
}

export default EditProfilePage;
