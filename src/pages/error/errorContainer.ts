import './error.scss';
import errorTemplate from './error.hbs';

const errorContainer = (errorString: string) => {
  const context = {
    errorNumber: errorString,
  };

  return errorTemplate(context);
};

export default errorContainer;
