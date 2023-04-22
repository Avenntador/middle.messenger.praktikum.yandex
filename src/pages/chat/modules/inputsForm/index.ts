import Component from '../../../../utils/Component';
import Input from '../../../../components/input';
import inputsFormTemplate from './inputsForm.hbs';
import IconButton from '../../../../components/iconButton';

import imageAndVideoIcon from '../../../../../static/icons/photo.png';
import fileIcon from '../../../../../static/icons/file.png';
import locationIcon from '../../../../../static/icons/location.png';
import attachIcon from '../../../../../static/icons/attachIcon.png';
import sendIcon from '../../../../../static/icons/arrowRightIcon.png';
import Menu from '../../components/menu';
import MenuItem from '../../components/menu/menuItem';
import Modal from '../../../../components/modal';

class InputForm extends Component {
  constructor() {
    super({});
  }

  init() {
    this.children.attachIconButton = new IconButton({
      icon: attachIcon,
      type: 'button',
      styles: { button: 'icon-button chat-content__attach' },
      events: {
        click: () => {
          const menuElment = this.children.attachMenu.getContent();
          if (menuElment) {
            this._showMenu(menuElment);
          }
        },
      },
    });
    this.children.attachMenu = new Menu({
      menuItems: [
        new MenuItem({
          icon: imageAndVideoIcon,
          title: 'Фото или Видео',
          styles: {
            menuItem: 'menu__item',
          },
          events: {
            click: () => {
              this._hideMenu(this.children.attachMenu.getContent());
              const modalElement = this.children.addFileModal.getContent();
              if (modalElement) {
                this._showModal(modalElement);
              }
            },
          },
        }),
        new MenuItem({
          icon: fileIcon,
          title: 'Файл',
          styles: {
            menuItem: 'menu__item',
          },
          events: {
            click: () => {
              this._hideMenu(this.children.attachMenu.getContent());
              const modalElement = this.children.addFileModal.getContent();
              if (modalElement) {
                this._showModal(modalElement);
              }
            },
          },
        }),
        new MenuItem({
          icon: locationIcon,
          title: 'Локация',
          styles: {
            menuItem: 'menu__item',
          },
          events: {},
        }),
      ],
      styles: {
        menu: 'menu__content menu__content-input',
      },
    });

    this.children.sendMessageButton = new IconButton({
      type: 'submit',
      icon: sendIcon,
      styles: { button: 'icon-button ' },
      events: {
        click: this.onSubmit,
      },
    });

    this.children.newMessageInput = new Input({
      label: '',
      type: 'text',
      name: 'message',
      placeholder: 'Сообщение',
      styles: {
        label: 'chat-content__new-message-label',
        input: 'input chat-content__new-message',
      },
    });

    this.children.addFileModal = new Modal({
      type: false,
      title: 'Добавить файл, видео или фото',
      buttonTitle: 'Добавить',
    });
    this.setProps({
      attachIcon,
    });
    this._initModalListeners(this.children.attachMenu.getContent());
    this._initModalListeners(this.children.addFileModal.getContent());
  }

  _showModal(element: HTMLElement) {
    element.style.display = 'block';
  }

  _initModalListeners(element: HTMLElement | null) {
    const currentModal = element;
    if (currentModal) {
      document.body.addEventListener('click', (e) => {
        if (e.target === element) {
          currentModal.style.display = 'none';
        }
      });
    }
  }

  _showMenu(element: HTMLElement) {
    element.style.display = 'flex';
  }

  _hideMenu(element: HTMLElement) {
    element.style.display = 'none';
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('Sended');
  }

  render() {
    return this.compile(inputsFormTemplate, { ...this.props });
  }
}

export default InputForm;
