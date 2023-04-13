import avatarIcon from 'static/icons/avatarIcon.png';
import changePasswordTemplate from './templates/change_password.hbs';

const changePassword = () => {
  const context = {
    avatarIcon,
  };

  return changePasswordTemplate(context);
};

export default changePassword;
