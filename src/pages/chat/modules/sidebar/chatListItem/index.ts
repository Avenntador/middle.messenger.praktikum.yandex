import Component from '../../../../../utils/Component';
import ChatListItemTemplate from './chat-list-item.hbs';
import { ChatInfo } from '../../../../../api/ChatsAPI';
import Avatar from '../../../../../components/avatar';

class ChatListItem extends Component<ChatInfo> {
  constructor(props: ChatInfo) {
    super({ ...props });
  }

  protected init(): void {
    this.children.avatar = new Avatar({
      avatar: this.props.avatar,
      withModal: false,
      styles: {
        avatar: 'avatar avatar_medium',
      },
    });
  }

  protected render() {
    return this.compile(ChatListItemTemplate, { ...this.props });
  }
}

export default ChatListItem;
