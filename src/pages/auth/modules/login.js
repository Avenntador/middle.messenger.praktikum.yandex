import loginTemplate from "./templates/login.hbs";

const login = () => {
  const context = {};

  return loginTemplate(context);
};

export default login;
