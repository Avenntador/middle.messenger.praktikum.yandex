import './chat.scss';
import Component from '../../utils/Component';
import ChatTemplate from './chat.hbs';
import Sidebar from './modules/sidebar';
import Header from './modules/header';
import InputForm from './modules/inputsForm';
import Correspondence from './modules/correspondence';
import ChatListItem from './modules/sidebar/chatListItem';
import Message from './modules/correspondence/message';

import avatarIcon from '../../../static/icons/avatarIcon.png';
import deliveredIcon from '../../../static/icons/deliveredIcon.png';

const mockChats = [
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Семен',
    lastMessage: 'Привет!',
    time: '11.02.2022',
    unreadMessagesCount: 1,
    mine: true,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Петя',
    lastMessage: 'Пока!',
    time: '13.02.2022',
    unreadMessagesCount: 4,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Вика',
    lastMessage: 'Хех!',
    time: '11.02.2022',
    unreadMessagesCount: 1,
    mine: true,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
    mine: true,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
    mine: true,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
    mine: true,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
  }),
  new ChatListItem({
    avatar: avatarIcon,
    userName: 'Света',
    lastMessage: ':)',
    time: '11.02.2022',
    unreadMessagesCount: 1,
  }),
];

const mockMessages = [
  new Message({
    mine: true,
    message: 'Hi',
    deliveredIcon,
    time: '12:00',
  }),
  new Message({
    mine: false,
    message: 'How are u?',
    deliveredIcon,
    time: '12:00',
  }),
  new Message({
    mine: true,
    image: avatarIcon,
    message: 'Fine',
    deliveredIcon,
    time: '12:00',
  }),
  new Message({
    mine: false,
    message: 'Good',
    deliveredIcon,
    time: '12:00',
  }),
  new Message({
    mine: true,
    image: avatarIcon,
    message: 'Look',
    deliveredIcon,
    time: '12:00',
  }),
];

class Chat extends Component {
  constructor() {
    super({});
  }

  init() {
    this.children.sidebar = new Sidebar({ chats: mockChats });
    this.children.correspondence = new Correspondence({ messages: mockMessages, date: '11 июня' });
    this.children.inputForm = new InputForm();
    this.children.header = new Header({ name: 'NAME' });
  }

  render() {
    return this.compile(ChatTemplate, { ...this.props });
  }
}

export default Chat;
