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

  public changePage(route: string) {
    switch (route) {
      case '/': {
        this.setProps({
          content: new LoginPage({}),
        });
        break;
      }
      case '/sign-up': {
        this.setProps({
          content: new RegisterPage({}),
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
