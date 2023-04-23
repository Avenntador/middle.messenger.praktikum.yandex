import './chat.scss';
import Component from '../../utils/Component';
import ChatTemplate from './chat.hbs';

import Sidebar from './modules/sidebar';
import ChatContent from './modules/chat-content';

import ChatListItem, { ChatListItemProps } from './modules/sidebar/chatListItem';
import Message from './components/message';

import avatarIcon from '../../../static/icons/avatarIcon.png';
import deliveredIcon from '../../../static/icons/deliveredIcon.png';

const mockChats = [
  {
    id: 1,
    lastMessage: {
      user: {
        first_name: 'Петя',
        second_name: 'Пупкин',
        avatar: avatarIcon,
        email: 'some@q.com',
        login: 'some',
        phone: 'some',
      },
    },
    time: '11.02.2022',
    unread_count: 1,
    mine: true,
    content: 'Привет!',
  },
  {
    id: 2,
    lastMessage: {
      user: {
        first_name: 'Витя',
        second_name: 'Пупкин',
        avatar: avatarIcon,
        email: 'some@q.com',
        login: 'some',
        phone: 'some',
      },
    },
    time: '11.02.2022',
    unread_count: 1,
    mine: false,
    content: 'Привет!',
  },
  {
    id: 3,
    lastMessage: {
      user: {
        first_name: 'Леня',
        second_name: 'Пупкин',
        avatar: avatarIcon,
        email: 'some@q.com',
        login: 'some',
        phone: 'some',
      },
    },
    time: '11.02.2022',
    unread_count: 1,
    mine: true,
    content: 'Привет!',
  },
];

const mockMessages = [
  {
    id: 1,
    messages: [
      {
        mine: true,
        message: 'Hi',
        deliveredIcon,
        time: '12:00',
      },
      {
        mine: false,
        message: 'How are u?',
        deliveredIcon,
        time: '12:00',
      },
    ],
  },
  {
    id: 2,
    messages: [
      {
        mine: true,
        message: 'HIHIHIIH',
        deliveredIcon,
        time: '12:00',
      },
      {
        mine: false,
        message: 'YOYOYOOY',
        deliveredIcon,
        time: '12:00',
      },
    ],
  },
  {
    id: 3,
    messages: [
      {
        mine: true,
        message: 'Privet',
        deliveredIcon,
        time: '12:00',
      },
      {
        mine: false,
        message: 'Privet',
        deliveredIcon,
        time: '12:00',
      },
    ],
  },
];

class Chat extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.sidebar = new Sidebar({
      chats: this._createChats(mockChats),
    });
    this.children.chatContent = new ChatContent({ isLoaded: false });
  }

  private _createChats(chats: ChatListItemProps[]) {
    return chats.map(
      (chat) => new ChatListItem({
        ...chat,
        events: {
          click: () => {
            this._selectChat(chat);
          },
        },
      }),
    );
  }

  private _selectChat(chat: ChatListItemProps) {
    mockMessages.forEach((fetchMessages) => {
      if (fetchMessages.id === chat.id) {
        (this.children.chatContent as Component).setProps({
          messages: fetchMessages.messages.map((item) => new Message({ ...item })),
          isLoaded: true,
          name: chat.lastMessage?.user.first_name,
        });
      }
    });
  }

  protected render() {
    return this.compile(ChatTemplate, { ...this.props });
  }
}

export default Chat;
