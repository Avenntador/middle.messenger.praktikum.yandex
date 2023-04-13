import avatarIcon from 'static/icons/avatarIcon.png';
import mainProfileTemplate from './templates/main_profile.hbs';

const mainProfile = () => {
  const context = {
    avatarIcon,
    name: 'Name',
  };

  return mainProfileTemplate(context);
};

export default mainProfile;
