import './profile.scss';
import Component from '../../utils/Component';
import profilePageTemplate from './profile.hbs';
import BackButton from './components/back_button';
import arrowLeftIcon from '../../../static/icons/arrowLeftIcon.png';
import { MainProfilePage } from './modules/main_profile';
import { EditProfilePage } from './modules/edit_profile';
import { ChangePasswordPage } from './modules/change_password';

class Profile extends Component {
  protected init() {
    this.children.backButton = new BackButton({
      backIcon: arrowLeftIcon,
    });

    switch (window.location.pathname) {
      case '/settings': {
        this.setProps({
          content: new MainProfilePage({}),
        });
        break;
      }
      case '/settings-edit': {
        this.setProps({
          content: new EditProfilePage({}),
        });
        break;
      }
      case '/settings-change-password': {
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

  protected render() {
    return this.compile(profilePageTemplate, { ...this.props });
  }
}

export default Profile;
