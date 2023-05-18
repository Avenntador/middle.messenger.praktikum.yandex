import Component from '../../../../utils/Component';
import backButtonTemplate from './back_button.hbs';
import Router from '../../../../utils/Router';

interface BackButtonProps {
  backIcon: string;
  events?: Record<string, (...args: any) => void>;
}

class BackButton extends Component<BackButtonProps> {
  constructor(props: BackButtonProps) {
    super({
      backIcon: props.backIcon,
      events: {
        click: () => Router.back(),
      },
    });
  }

  protected render() {
    return this.compile(backButtonTemplate, { ...this.props });
  }
}

export default BackButton;
