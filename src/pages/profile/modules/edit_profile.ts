import avatarIcon from 'static/icons/avatarIcon.png';
import edit_profile from './templates/edit_profile.hbs';

const editProfile = () => {
  const context = {
    avatarIcon,
  };

  return edit_profile(context);
};

export default editProfile;
