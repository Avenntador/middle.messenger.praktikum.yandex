import './profile.scss';
import Component from '../../utils/Component';
import profilePageTemplate from './profile.hbs';
import BackButton from './components/back_button';
import arrowLeftIcon from '../../../static/icons/arrowLeftIcon.png';
import MainProfilePage from './modules/main_profile';
import EditProfilePage from './modules/edit_profile';
import ChangePasswordPage from './modules/change_password';
import onSubmitForm from '../../utils/helpers';

interface ProfileProps {
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
      case 'profile': {
        this.setProps({ content: new MainProfilePage() });
        break;
      }
      case 'profile-edit': {
        this.setProps({
          content: new EditProfilePage({}),
        });
        break;
      }
      case 'profile-change-password': {
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

export default Profile;
