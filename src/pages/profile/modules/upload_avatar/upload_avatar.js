import "./upload_avatar.scss";
import uploadAvatarTemplate from "../templates/upload_avatar.hbs";

export const uploadAvatar = () => {
  const context = {};

  return uploadAvatarTemplate(context);
};
