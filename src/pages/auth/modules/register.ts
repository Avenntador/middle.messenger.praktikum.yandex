import registerTemplate from './templates/register.hbs';

const register = () => {
  const context = {};

  return registerTemplate(context);
};

export default register;
