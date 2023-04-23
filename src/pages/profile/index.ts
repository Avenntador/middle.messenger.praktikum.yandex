import './profile.scss';
import Component from '../../utils/Component';
import profilePageTemplate from './profile.hbs';
import BackButton from './components/back_button';
import arrowLeftIcon from '../../../static/icons/arrowLeftIcon.png';
import MainProfilePage from './modules/main_profile';
import EditProfilePage from './modules/edit_profile';
import ChangePasswordPage from './modules/change_password';

import avatarIcon from '../../../static/icons/avatarIcon.png';
import Avatar from '../../components/avatar';
import Modal from '../../components/modal';

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

  protected init() {
    this.children.backButton = new BackButton({
      backIcon: arrowLeftIcon,
    });
    this.children.modal = new Modal({
      type: false,
      title: 'Загрузите файл',
      buttonTitle: 'Поменять',
    });
    this.children.avatar = new Avatar({
      avatar: avatarIcon,
      withModal: true,
      title: 'Name',
      styles: {
        avatar: 'profile__avatar avatar avatar_large',
        title: 'profile__username',
      },
      events: {
        click: () => {
          const modalElement = (this.children.modal as Component).getContent();
          if (modalElement) {
            this._showModal(modalElement);
          }
        },
      },
    });
    this._initModalListeners(this.children.modal.getContent());
  }

  private _initModalListeners(element: HTMLElement | null) {
    const currentModal = element;
    if (currentModal) {
      document.body.addEventListener('click', (e) => {
        if (e.target === element) {
          currentModal.style.display = 'none';
        }
      });
    }
  }

  private _showModal(element: HTMLElement) {
    element.style.display = 'block';
  }

  protected render() {
    return this.compile(profilePageTemplate, { ...this.props });
  }
}

export default Profile;
