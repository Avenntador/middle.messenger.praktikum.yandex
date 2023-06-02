import './avatar.scss';
import avatarTemplate from './avatarTmpl.hbs';
import Component from '../../utils/Component';
import avatarStub from '../../../static/icons/avatarIcon.png';

interface AvatarProps {
  avatar?: string;
  avatarStub?: string;
  withModal?: boolean;
  styles?: Record<string, string>;
  events?: Record<string, () => void>;
}

class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ ...props, avatarStub });
  }

  protected render() {
    return this.compile(avatarTemplate, { ...this.props });
  }
}

export default Avatar;
