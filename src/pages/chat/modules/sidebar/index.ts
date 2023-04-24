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

  protected init() {
    this.children.openProfileButton = new Button({
      type: 'button',
      label: 'Профиль >',
      styles: {
        button: 'button button_outlined sidebar__user-profile-button',
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
    });
  }

  protected render() {
    return this.compile(SidebarTemplate, { ...this.props });
  }
}

export default Sidebar;
