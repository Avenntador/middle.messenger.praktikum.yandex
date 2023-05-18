import Component from '../../../../../../utils/Component';
import headerTemplate from './header.hbs';

import Menu from '../../../../components/menu';
import MenuItem from '../../../../components/menu/menuItem';
import Modal from '../../../../../../components/modal';
import Avatar from '../../../../../../components/avatar';
import Button from '../../../../../../components/button';
import imageAndVideoIcon from '../../../../../../../static/icons/photo.png';
import { ChatInfo } from '../../../../../../api/ChatsAPI';
import ChatsController from '../../../../../../controllers/ChatsController';
import UserController from '../../../../../../controllers/UserController';

interface HeaderProps {
  selectedChat?: ChatInfo;
}

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super({ ...props });
  }

  protected init() {
    this.children.avatar = new Avatar({
      avatar: this.props.selectedChat?.avatar,
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
      title: 'Добавить пользователя',
      inputTitle: 'Логин',
      buttonTitle: 'Добавить',
      submitCallback: (user: string) => {
        UserController.getUserByLogin(user).then((res) => {
          const userById = JSON.parse(res as unknown as string);
          const { id } = userById[0];

          if (this.props.selectedChat?.id) {
            ChatsController.addUserToChat(this.props.selectedChat?.id, id);
          }
        });
      },
    });
    this.children.deleteUserModal = new Modal({
      title: 'Удалить пользователя',
      inputTitle: 'Логин',
      buttonTitle: 'Удалить',
      submitCallback: (user: string) => {
        UserController.getUserByLogin(user).then((res) => {
          const userById = JSON.parse(res as unknown as string);
          const { id } = userById[0];

          if (this.props.selectedChat?.id) {
            ChatsController.deleteUsersFromChat(this.props.selectedChat?.id, id);
          }
        });
      },
    });

    this._initModalListeners(this.children.userMenu.getContent());
    this._initModalListeners(this.children.addUserModal.getContent());
    this._initModalListeners(this.children.deleteUserModal.getContent());
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

  private _showModal(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'block';
    }
  }

  private _hideModal(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'block';
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

  protected componentDidUpdate(_oldProps: HeaderProps, _newProps: HeaderProps): boolean {
    (this.children.avatar as Component).setProps({ avatar: _newProps.selectedChat?.avatar });

    return true;
  }

  protected render() {
    return this.compile(headerTemplate, { ...this.props });
  }
}

export default Header;
