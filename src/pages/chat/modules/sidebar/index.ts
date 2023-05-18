import Component from '../../../../utils/Component';
import SidebarTemplate from './sidebar.hbs';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import ChatListItem from './chatListItem';
import Router from '../../../../utils/Router';
import ChatsController from '../../../../controllers/ChatsController';
import Menu from '../../components/menu';
import MenuItem from '../../components/menu/menuItem';
import IconButton from '../../../../components/iconButton';
import imageAndVideoIcon from '../../../../../static/icons/file.png';
import addIcon from '../../../../../static/icons/plus.png';

import Modal from '../../../../components/modal';

import MessagesController from '../../../../controllers/MessagesController';

interface SidebarProps {
  chats?: ChatListItem[];
}

class Sidebar extends Component<SidebarProps> {
  constructor(props: SidebarProps) {
    super({
      chats: props.chats,
    });
  }

  protected init() {
    this.children.utilMenuIconButton = new IconButton({
      icon: addIcon,
      type: 'button',
      styles: { button: 'icon-button sidebar__menu' },
      events: {
        click: () => {
          const menuElment = (this.children.utilMenu as Component).getContent();
          if (menuElment) {
            this._showMenu(menuElment);
          }
        },
      },
    });

    this.children.utilMenu = new Menu({
      styles: {
        menu: 'menu__content menu__content-sidebar',
      },
      menuItems: [
        new MenuItem({
          icon: imageAndVideoIcon,
          title: 'Создать чат',
          styles: {
            menuItem: 'menu__item',
          },
          events: {
            click: () => {
              this._hideMenu((this.children.utilMenu as Component).getContent());
              const modalElement = (this.children.createChatModal as Component).getContent();
              if (modalElement) {
                this._showModal(modalElement);
              }
            },
          },
        }),
      ],
    });

    this.children.createChatModal = new Modal({
      title: 'Создать чат',
      inputTitle: 'Название чата',
      buttonTitle: 'Создать чат',
      submitCallback: (title: string) => {
        ChatsController.create(title);
        this._hideModal((this.children.createChatModal as Component).getContent());
      },
    });

    this.children.openProfileButton = new Button({
      type: 'button',
      label: 'Профиль >',
      styles: {
        button: 'button button_outlined sidebar__user-profile-button',
      },
      events: {
        click: () => {
          MessagesController.closeAll();
          Router.go('/settings');
        },
      },
    });

    this.children.searchInput = new Input({
      type: 'text',
      name: 'chat-search',
      selector: 'input',
      placeholder: 'Поиск',
      styles: {
        input: 'input input_no-border sidebar__search-chat-input',
      },
      events: {
        keyup: (e) => {
          ChatsController.getChats({ title: e.target.value });
        },
      },
    });

    this._initModalListeners(this.children.utilMenu.getContent());
    this._initModalListeners(this.children.createChatModal.getContent());
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

  private _showModal(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'block';
    }
  }

  private _hideModal(element: HTMLElement | null) {
    if (element) {
      element.style.display = 'none';
    }
  }

  protected render() {
    return this.compile(SidebarTemplate, { ...this.props });
  }
}

export default Sidebar;
