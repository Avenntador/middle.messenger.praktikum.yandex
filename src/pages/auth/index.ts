import './auth.scss';
import Component from '../../utils/Component';
import LoginPage from './modules/login';
import RegisterPage from './modules/register';
import AuthTemplate from './auth.hbs';

interface AuthProps {
  content?: Component;
}

class Auth extends Component {
  constructor(props?: AuthProps) {
    super({
      content: props?.content,
    });
  }

  protected init(): void {
    switch (window.location.pathname) {
      case '/': {
        this.setProps({
          content: new LoginPage(),
        });
        break;
      }
      case '/sign-up': {
        this.setProps({
          content: new RegisterPage(),
        });
        break;
      }

      default: {
        break;
      }
    }
  }

  protected render() {
    return this.compile(AuthTemplate, { ...this.props });
  }
}

export default Auth;
