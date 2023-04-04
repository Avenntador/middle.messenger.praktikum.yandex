import changePasswordTemplate from "./templates/change_password.hbs";
import avatarIcon from "static/icons/avatarIcon.png";

const changePassword = () => {
  const context = {
    avatarIcon,
  };

  return changePasswordTemplate(context);
};

export default changePassword;
