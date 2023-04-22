import Component from '../../utils/Component';
import buttonTemplate from './iconButton.hbs';

interface IconButtonProps {
  icon: string;
  styles: Record<string, string>;
  type?: string;
  events?: Record<string, (...args: any) => void>;
}

class IconButton extends Component<IconButtonProps> {
  constructor(props: IconButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(buttonTemplate, this.props);
  }
}

export default IconButton;
