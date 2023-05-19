import './chat.scss';
import Component from '../../utils/Component';
import ChatTemplate from './chat.hbs';

import Sidebar from './modules/sidebar';
import { ChatContent } from './modules/chat-content';
import ChatListItem from './modules/sidebar/chatListItem';

import { Message } from '../../controllers/MessagesController';
import ChatsController from '../../controllers/ChatsController';

import { ChatInfo } from '../../api/ChatsAPI';
import { withStore } from '../../utils/Store';
import Router from '../../utils/Router';

interface ChatProps {
  chats: ChatInfo[];
  userLogin: string;
  messages: Message[];
  selectedChat: number;
  chatIsLoaded: boolean;
}

class Chat extends Component<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props, chatIsLoaded: false });
  }

  protected init() {
    ChatsController.getChats({ title: '' });

    this.children.sidebar = new Sidebar({
      chats: this.createChats(this.props),
    });

    this.children.chatContent = new ChatContent({
      chatIsLoaded: this.props.chatIsLoaded,
      deleteChat: (selectChat: number) => {
        if (selectChat) {
          ChatsController.deleteChat(selectChat).then(() => {
            Router.go('/messenger');
            (this.children.chatContent as Component).setProps({ chatIsLoaded: false });
          });
        }
      },
    });
  }

  private createChats(props: ChatProps) {
    if (props.chats) {
      return props.chats.map((chat) => {
        let mine = false;
        if (chat.last_message) {
          mine = chat.last_message.user.login === props.userLogin;
        }

        return new ChatListItem({
          ...chat,
          mine,
          events: {
            click: () => {
              ChatsController.selectChat(chat.id);
              (this.children.chatContent as Component).setProps({ chatIsLoaded: true });
            },
          },
        });
      });
    }

    return [];
  }

  protected componentDidUpdate(_oldProps: ChatProps, _newProps: ChatProps): boolean {
    (this.children.sidebar as Component).setProps({
      chats: this.createChats(_newProps),
    });

    return false;
  }

  protected render() {
    return this.compile(ChatTemplate, { ...this.props });
  }
}

const withChat = withStore((state) => {
  return {
    chats: state.chats || [],
    selectedChat: state.selectedChat,
  };
});

export default withChat(Chat);
