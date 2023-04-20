import './chat.scss';
import Component from '../../utils/Component';
import ChatTemplate from './chat.hbs';
import Button from '../../components/button';
import Input from '../../components/input';
import Avatar from '../../components/avatar';
import Sidebar from './modules/sidebar';

import avatarIcon from '../../../static/icons/avatarIcon.png';
import deliveredIcon from '../../../static/icons/deliveredIcon.png';
import arrowRightIcon from '../../../static/icons/arrowRightIcon.png';
import attachIcon from '../../../static/icons/attachIcon.png';
import ChatListItem from './modules/sidebar/chatListItem';
import Correspondence from './modules/correspondence';
import Message from './modules/correspondence/message';

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
    this.children.avatar = new Avatar({
      avatar: avatarIcon,
      withModal: false,
      styles: {
        avatar: 'avatar avatar_small',
      },
    });

    this.children.correspondence = new Correspondence({ messages: mockMessages });

    this.children.sidebar = new Sidebar({ chats: mockChats });

    this.children.userAddOrDeleteButton = new Button({
      type: 'button',
      label: '',
      styles: {
        button: 'chat-content__util-menu button button_featured',
      },
    });
    this.children.newMessageInput = new Input({
      label: '',
      type: 'text',
      name: 'message',
      placeholder: 'Сообщение',
      styles: {
        label: 'chat-content__new-message-label',
        input: 'input chat-content__new-message',
      },
    });
    this.setProps({ arrowRightIcon, attachIcon, name: 'NAME' });
  }

  render() {
    return this.compile(ChatTemplate, { ...this.props });
  }
}

export default Chat;
