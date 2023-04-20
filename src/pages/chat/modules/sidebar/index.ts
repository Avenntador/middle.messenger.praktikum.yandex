import Component from '../../../../utils/Component';
import SidebarTemplate from './sidebar.hbs';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import ChatListItem from './chatListItem';

interface SidebarProps {
  chats: ChatListItem[];
}

class Sidebar extends Component<SidebarProps> {
  constructor(props: SidebarProps) {
    super({
      chats: props.chats,
    });
  }

  init() {
    this.children.openProfileButton = new Button({
      type: 'button',
      label: 'Профиль >',
      styles: {
        button: 'button button_outlined sidebar__user-profile-button',
      },
    });

    this.children.searchInput = new Input({
      label: '',
      type: 'text',
      name: 'chat-search',
      placeholder: 'Поиск',
      styles: {
        input: 'input input_no-border sidebar__search-chat-input',
      },
    });
  }

  render() {
    return this.compile(SidebarTemplate, { ...this.props });
  }
}

export default Sidebar;
