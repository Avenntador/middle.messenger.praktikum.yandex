import Component from '../../utils/Component';
import buttonTemplate from './button.hbs';

interface ButtonProps {
  label: string;
  styles: Record<string, string>;
  type?: string;
  events?: Record<string, (...args: any) => void>;
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render() {
    return this.compile(buttonTemplate, this.props);
  }
}

export default Button;
