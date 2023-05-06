import './profile.scss';
import Component from '../../utils/Component';
import profilePageTemplate from './profile.hbs';
import BackButton from './components/back_button';
import arrowLeftIcon from '../../../static/icons/arrowLeftIcon.png';
import MainProfilePage from './modules/main_profile';
import EditProfilePage from './modules/edit_profile';
import ChangePasswordPage from './modules/change_password';
import { User } from '../../api/AuthAPI';
import { withStore } from '../../utils/Store';

interface ProfileProps {
  currentUser?: User;
  content?: Component;
}

class Profile extends Component {
  constructor(props?: ProfileProps) {
    super({
      content: props?.content,
    });
  }

  public changePage(route: string) {
    switch (route) {
      case '/settings': {
        console.log(this.props);

        this.setProps({ content: new MainProfilePage() });
        break;
      }
      case '/settings-edit': {
        console.log(this.props);
        this.setProps({
          content: new EditProfilePage({}),
        });
        break;
      }
      case '/settings-change-password': {
        console.log(this.props);
        this.setProps({
          content: new ChangePasswordPage({}),
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  protected init() {
    this.children.backButton = new BackButton({
      backIcon: arrowLeftIcon,
    });
  }

  protected render() {
    return this.compile(profilePageTemplate, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(Profile);
