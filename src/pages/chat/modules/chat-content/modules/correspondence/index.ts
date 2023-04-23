import Component from '../../../../../../utils/Component';
import CorrespondenceTeamplate from './correspondence.hbs';
import Message from '../../../../components/message';

interface CorrespondenceProps {
  messages?: Message[];
  date?: string;
}

class Correspondence extends Component<CorrespondenceProps> {
  constructor(props: CorrespondenceProps) {
    super({ ...props });
  }

  protected render() {
    return this.compile(CorrespondenceTeamplate, { ...this.props });
  }
}

export default Correspondence;
