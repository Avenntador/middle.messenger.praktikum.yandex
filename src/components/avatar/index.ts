import './avatar.scss';
import avatarTemplate from './avatar.hbs';
import Component from '../../utils/Component';

interface AvatarProps {
  avatar: string;
  withModal: boolean;
  styles?: Record<string, string>;
  events?: Record<string, () => void>;
}

class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  protected render() {
    return this.compile(avatarTemplate, { ...this.props });
  }
}

export default Avatar;
