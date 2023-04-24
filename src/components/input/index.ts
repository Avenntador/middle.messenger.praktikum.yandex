import './input.scss';
import Component from '../../utils/Component';
import inputTemplate from './input.hbs';

interface InputProps {
  name?: string;
  styles?: Record<string, string>;
  selector?: string;
  fileInputLabel?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  events?: Record<string, (...args: any) => void>;
}

class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }

  setValidError(): void {
    // this.input.dataset.valid = 'false';
    // this.element.querySelector('[data-validation-error]')?.classList.add('visible');
    // this.props.checkFormValid();
    // this.setProps({ error: true });
  }

  setValid(): void {
    // this.input.dataset.valid = 'true';
    // this.element.querySelector('[data-validation-error]')?.classList.remove('visible');
    // this.props.checkFormValid();
    // this.setProps({ error: false });
  }

  protected render() {
    return this.compile(inputTemplate, this.props);
  }
}

export default Input;
