import Component from '../../../../../../utils/Component';
import Input from '../../../../../../components/input';
import inputsFormTemplate from './inputsForm.hbs';
import IconButton from '../../../../../../components/iconButton';

import imageAndVideoIcon from '../../../../../../../static/icons/photo.png';
import fileIcon from '../../../../../../../static/icons/file.png';
import locationIcon from '../../../../../../../static/icons/location.png';
import attachIcon from '../../../../../../../static/icons/attachIcon.png';
import sendIcon from '../../../../../../../static/icons/arrowRightIcon.png';
import Menu from '../../../../components/menu';
import MenuItem from '../../../../components/menu/menuItem';
import Modal from '../../../../../../components/modal';

class InputForm extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.attachIconButton = new IconButton({
      icon: attachIcon,
      type: 'button',
      styles: { button: 'icon-button chat-content__attach' },
      events: {
        click: () => {
          const menuElment = (this.children.attachMenu as Component).getContent();
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
              this._hideMenu((this.children.attachMenu as Component).getContent());
              const modalElement = (this.children.addFileModal as Component).getContent();
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
              this._hideMenu((this.children.attachMenu as Component).getContent());
              const modalElement = (this.children.addFileModal as Component).getContent();
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
        click: this._onSubmit,
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
      title: 'Добавить файл',
      buttonTitle: 'Добавить',
    });
    this.setProps({
      attachIcon,
    });
    this._initModalListeners(this.children.attachMenu.getContent());
    this._initModalListeners(this.children.addFileModal.getContent());
  }

  private _showModal(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'block';
    }
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

  private _showMenu(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'flex';
    }
  }

  private _hideMenu(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'none';
    }
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    console.log('Sended');
  }

  protected render() {
    return this.compile(inputsFormTemplate, { ...this.props });
  }
}

export default InputForm;
