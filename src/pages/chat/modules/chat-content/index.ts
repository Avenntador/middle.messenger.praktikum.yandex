import Component from '../../../../utils/Component';
import ChatConentTemplate from './chat-content.hbs';
import Header from './modules/header';
import InputForm from './modules/inputsForm';
import Correspondence from './modules/correspondence';
import Message, { MessageProps } from '../../components/message';
import { withStore } from '../../../../utils/Store';
import { ChatInfo } from '../../../../api/ChatsAPI';

interface ChatContentProps {
  isLoaded: boolean;
  messages?: MessageProps[];
  selectedChat?: ChatInfo;
  userId: number;
  selectedChatId: number;
}

class ChatContentModule extends Component<ChatContentProps> {
  constructor(props: ChatContentProps) {
    super({ ...props });
  }

  protected init() {
    this.children.header = new Header({ selectedChat: this.props.selectedChat });
    this.children.correspondence = new Correspondence({
      messages: this.createMessages(this.props),
    });
    this.children.inputForm = new InputForm({ selectedChatId: this.props.selectedChatId });
  }

  protected componentDidUpdate(oldProps: ChatContentProps, newProps: ChatContentProps) {
    if (newProps.selectedChat) {
      (this.children.header as Component).setProps({ selectedChat: newProps.selectedChat });

      (this.children.correspondence as Component).setProps({
        messages: this.createMessages(newProps),
        chatDate:
          newProps.messages && newProps.messages.length !== 0 ? newProps.messages[0].time : '',
      });

      (this.children.inputForm as Component).setProps({ selectedChatId: newProps.selectedChatId });
    }

    return true;
  }

  private createMessages(props: ChatContentProps) {
    if (props.messages) {
      return props.messages.map((message) => {
        const mine = message.user_id === props.userId;

        return new Message({ ...message, mine });
      });
    }

    return [];
  }

  protected render() {
    return this.compile(ChatConentTemplate, { ...this.props });
  }
}

const withChat = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.chats?.filter((chat) => chat.id === selectedChatId)[0],
    userId: state.currentUser?.id,
    selectedChatId,
  };
});

// eslint-disable-next-line import/prefer-default-export
export const ChatContent = withChat(ChatContentModule);
