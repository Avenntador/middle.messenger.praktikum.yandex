import Component from '../../../../utils/Component';
import CorrespondenceTeamplate from './correspondence.hbs';
import Message from './message';

interface CorrespondenceProps {
  messages: Message[];
}

class Correspondence extends Component<CorrespondenceProps> {
  constructor(props: CorrespondenceProps) {
    super({
      messages: props.messages,
    });
  }

  render() {
    return this.compile(CorrespondenceTeamplate, { ...this.props });
  }
}

export default Correspondence;