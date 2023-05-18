import Component from '../../../../utils/Component';
import MessageTemplate from './message.hbs';
import deliveredIcon from '../../../../../static/icons/deliveredIcon.png';

export interface MessageProps {
  mine: boolean;
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
  deliveredIcon?: string;
}

class Message extends Component<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props, deliveredIcon });
  }

  protected render() {
    return this.compile(MessageTemplate, { ...this.props });
  }
}
export default Message;
