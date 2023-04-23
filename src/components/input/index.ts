import './input.scss';
import Component from '../../utils/Component';
import inputTemplate from './input.hbs';

interface InputProps {
  name: string;
  styles: Record<string, string>;
  fileInputLabel?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  type?: string;
  events?: Record<string, (...args: any) => void>;
}

class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }

  render() {
    return this.compile(inputTemplate, this.props);
  }
}

export default Input;
