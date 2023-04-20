import Component from '../../../../utils/Component';
import backButtonTemplate from './back_button.hbs';

interface BackButtonProps {
  backIcon: string;
}

class BackButton extends Component<BackButtonProps> {
  constructor(props: BackButtonProps) {
    super({
      backIcon: props.backIcon,
    });
  }

  render() {
    return this.compile(backButtonTemplate, { ...this.props });
  }
}

export default BackButton;
