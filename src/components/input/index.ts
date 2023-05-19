import './input.scss';
import Component from '../../utils/Component';
import inputTemplate from './input.hbs';

interface InputProps {
  value?: string;
  name?: string;
  styles?: Record<string, string>;
  selector?: string;
  fileInputLabel?: string;
  label?: string;
  placeholder?: string | number;
  isDisabled?: boolean;
  type?: string;
  errorMessage?: string;
  events?: Record<string, (...args: any) => void>;
}

class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super({ ...props });
  }

  public clearInput() {
    if (this.props.name) {
      const elem = document.getElementsByName(this.props.name) as NodeList;
      (elem[0] as HTMLInputElement).value = '';
    }
  }

  public setValidError() {
    const errorElement = this.element?.querySelector('.error-message') as HTMLElement;
    errorElement.style.display = 'block';
  }

  public setValid() {
    const errorElement = this.element?.querySelector('.error-message') as HTMLElement;
    errorElement.style.display = 'none';
  }

  protected render() {
    return this.compile(inputTemplate, this.props);
  }
}

export default Input;
