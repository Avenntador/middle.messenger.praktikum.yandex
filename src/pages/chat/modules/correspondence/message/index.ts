import Component from '../../../../../utils/Component';
import MessageTemplate from './message.hbs';

interface MessageProps {
  message: string;
  time: string;
  deliveredIcon?: string;
  image?: string;
  mine?: boolean;
}

class Message extends Component<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props });
  }

  render() {
    return this.compile(MessageTemplate, { ...this.props });
  }
}
export default Message;
