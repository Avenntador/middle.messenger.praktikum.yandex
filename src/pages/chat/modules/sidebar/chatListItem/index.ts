import Component from '../../../../../utils/Component';
import ChatListItemTemplate from './chat-list-item.hbs';

interface ChatListItemProps {
  avatar: string;
  userName: string;
  lastMessage: string;
  time: string;
  unreadMessagesCount: number;
  mine?: boolean;
}

class ChatListItem extends Component<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({ ...props });
  }

  render() {
    return this.compile(ChatListItemTemplate, { ...this.props });
  }
}

export default ChatListItem;
