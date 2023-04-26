import Component from '../../../../utils/Component';
import ChatConentTemplate from './chat-content.hbs';
import Header from './modules/header';
import InputForm from './modules/inputsForm';
import Correspondence from './modules/correspondence';
import Message from '../../components/message';

interface ChatContentProps {
  isLoaded: boolean;
  messages?: Message[];
  name?: string;
}

class ChatContent extends Component<ChatContentProps> {
  constructor(props: ChatContentProps) {
    super({ ...props });
  }

  protected init() {
    this.children.header = new Header({});
    this.children.correspondence = new Correspondence({});
    this.children.inputForm = new InputForm();
  }

  protected componentDidUpdate(oldProps: ChatContentProps, newProps: ChatContentProps) {
    (this.children.header as Component).setProps({ name: newProps.name });
    (this.children.correspondence as Component).setProps({ messages: newProps.messages });
    return true;
  }

  protected render() {
    return this.compile(ChatConentTemplate, { ...this.props });
  }
}

export default ChatContent;
