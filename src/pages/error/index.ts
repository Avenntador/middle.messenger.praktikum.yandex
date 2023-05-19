import './error.scss';
import Component from '../../utils/Component';
import errorPageTemplate from './error.hbs';

class ErrorPage extends Component {
  constructor() {
    super({});
  }

  public changePage(route: string) {
    switch (route) {
      case '/404': {
        this.setProps({
          errorNumber: 404,
          title: 'Страница не найдена',
        });
        break;
      }
      case '/500': {
        this.setProps({
          errorNumber: 500,
          title: 'Все сломалось',
        });
        break;
      }

      default: {
        break;
      }
    }
  }

  protected render() {
    return this.compile(errorPageTemplate, this.props);
  }
}

export default ErrorPage;
