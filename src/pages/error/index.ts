import './error.scss';
import Component from '../../utils/Component';
import errorPageTemplate from './error.hbs';

interface ErrorPageProps {
  errorNumber?: string;
}

class Button extends Component<ErrorPageProps> {
  constructor(props?: ErrorPageProps) {
    super({ ...props });
  }

  protected render() {
    return this.compile(errorPageTemplate, this.props);
  }
}

export default Button;
