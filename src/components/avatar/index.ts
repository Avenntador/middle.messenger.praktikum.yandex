import avatarTemplate from './avatar.hbs';
import Component from '../../utils/Component';

interface AvatarProps {
  avatar: string;
  withModal: boolean;
  title?: string;
  styles?: Record<string, string>;
  events?: Record<string, () => void>;
}

class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  render() {
    return this.compile(avatarTemplate, { ...this.props });
  }
}

export default Avatar;