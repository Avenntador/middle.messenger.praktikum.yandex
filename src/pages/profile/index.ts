import './profile.scss';
import Component from '../../utils/Component';
import profilePageTemplate from './profile.hbs';
import BackButton from './components/back_button';
import arrowLeftIcon from '../../../static/icons/arrowLeftIcon.png';
import MainProfilePage from './modules/main_profile';
import EditProfilePage from './modules/edit_profile';
import ChangePasswordPage from './modules/change_password';
import UploadAvatar from './components/upload_avatar';

import avatarIcon from '../../../static/icons/avatarIcon.png';
import Avatar from '../../components/avatar';

interface ProfileProps {
  content?: Component;
}

class Profile extends Component {
  constructor(props?: ProfileProps) {
    super({
      content: props?.content,
    });
  }

  changePage(route: string) {
    switch (route) {
      case 'profile': {
        this.setProps({ content: new MainProfilePage() });
        break;
      }
      case 'profile-edit': {
        this.setProps({ content: new EditProfilePage() });
        break;
      }
      case 'profile-change-password': {
        this.setProps({ content: new ChangePasswordPage() });
        break;
      }
      default: {
        break;
      }
    }
  }

  init() {
    this.children.backButton = new BackButton({
      backIcon: arrowLeftIcon,
    });
    this.children.modal = new UploadAvatar();
    this.children.avatar = new Avatar({
      avatar: avatarIcon,
      withModal: true,
      title: 'Name',
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
        modal: 'profile__avatar-hover-change-background',
        title: 'profile__username',
      },
      events: {
        click: () => {
          const modalElement = this.children.modal.getContent();
          if (modalElement) {
            this.showModal(modalElement);
          }
        },
      },
    });
    this.initModalListeners(this.children.modal.getContent());
  }

  initModalListeners(element: HTMLElement | null) {
    const currentModal = element;
    if (currentModal) {
      document.body.addEventListener('click', (e) => {
        if (e.target === element) {
          currentModal.style.display = 'none';
        }
      });
    }
  }

  showModal(element: HTMLElement) {
    const currentModal = element;
    currentModal.style.display = 'block';
  }

  render() {
    return this.compile(profilePageTemplate, { ...this.props });
  }
}

export default Profile;
