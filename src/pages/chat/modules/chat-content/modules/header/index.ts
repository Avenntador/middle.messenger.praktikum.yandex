import Component from '../../../../../../utils/Component';
import headerTemplate from './header.hbs';

import Menu from '../../../../components/menu';
import MenuItem from '../../../../components/menu/menuItem';
import Modal from '../../../../../../components/modal';
import Avatar from '../../../../../../components/avatar';
import Button from '../../../../../../components/button';
import avatarIcon from '../../../../../../../static/icons/avatarIcon.png';
import imageAndVideoIcon from '../../../../../../../static/icons/photo.png';

interface HeaderProps {
  name?: string;
}

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super({ ...props });
  }

  init() {
    this.children.avatar = new Avatar({
      avatar: avatarIcon,
      withModal: false,
      styles: {
        avatar: 'avatar avatar_small',
      },
    });
    this.children.userMenu = new Menu({
      menuItems: [
        new MenuItem({
          icon: imageAndVideoIcon,
          title: 'Добавить пользователя',
          styles: {
            menuItem: 'menu__item',
          },
          events: {
            click: () => {
              this._hideMenu((this.children.userMenu as Component).getContent());
              const modalElement = (this.children.addUserModal as Component).getContent();
              if (modalElement) {
                this._showModal(modalElement);
              }
            },
          },
        }),
        new MenuItem({
          icon: imageAndVideoIcon,
          title: 'Удалить пользователя',
          styles: {
            menuItem: 'menu__item',
          },
          events: {
            click: () => {
              this._hideMenu((this.children.userMenu as Component).getContent());
              const modalElement = (this.children.deleteUserModal as Component).getContent();
              if (modalElement) {
                this._showModal(modalElement);
              }
            },
          },
        }),
      ],
      styles: {
        menu: 'menu__content menu__content-header',
      },
    });
    this.children.userButton = new Button({
      type: 'button',
      label: '',
      styles: {
        button: 'chat-content__util-menu button button_featured',
      },
      events: {
        click: () => {
          const menuElment = (this.children.userMenu as Component).getContent();
          if (menuElment) {
            this._showMenu(menuElment);
          }
        },
      },
    });

    this.children.addUserModal = new Modal({
      type: true,
      title: 'Добавить пользователя',
      buttonTitle: 'Добавить',
    });
    this.children.deleteUserModal = new Modal({
      type: true,
      title: 'Удалить пользователя',
      buttonTitle: 'Удалить',
    });

    this._initModalListeners(this.children.userMenu.getContent());
    this._initModalListeners(this.children.addUserModal.getContent());
    this._initModalListeners(this.children.deleteUserModal.getContent());
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

  _showModal(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'block';
    }
  }

  _showMenu(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'flex';
    }
  }

  _hideMenu(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'none';
    }
  }

  render() {
    return this.compile(headerTemplate, { ...this.props });
  }
}

export default Header;
