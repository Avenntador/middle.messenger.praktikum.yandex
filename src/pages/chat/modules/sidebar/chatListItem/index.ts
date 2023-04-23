import Component from '../../../../../utils/Component';
import ChatListItemTemplate from './chat-list-item.hbs';

export interface ChatListItemProps {
  id?: number;
  avatar?: string;
  unread_count?: number;
  lastMessage?: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
  };
  time?: string;
  content?: string;
  mine?: boolean;
  events?: Record<string, (...args: any) => void>;
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
