import "./auth.scss";

import loginTemplate from "./modules/login";
import registerTemplate from "./modules/register";
import authContainerTemplate from "./authContainer.hbs";

const authContainer = (path: string) => {
  let renderComponent = path === "/" ? loginTemplate() : registerTemplate();
  const context = {
    renderComponent,
  };

  return authContainerTemplate(context);
};

export default authContainer;
