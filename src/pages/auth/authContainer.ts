import './auth.scss';

import loginTemplate from './modules/login';
import registerTemplate from './modules/register';
import authContainerTemplate from './authContainer.hbs';
// import Block from 'src/utils/Block';

const authContainer = (path: string) => {
  const renderComponent = path === '/' ? loginTemplate() : registerTemplate();
  const context = {
    renderComponent,
  };

  return authContainerTemplate(context);
};

export default authContainer;
