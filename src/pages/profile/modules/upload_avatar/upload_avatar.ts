import './upload_avatar.scss';
import uploadAvatarTemplate from '../templates/upload_avatar.hbs';

const uploadAvatar = () => {
  const context = {};

  return uploadAvatarTemplate(context);
};

export default uploadAvatar;
