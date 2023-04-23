import Component from '../../../../../utils/Component';
import MenuItemTemplate from './menuItem.hbs';

interface MenuItemProps {
  icon: string;
  title: string;
  styles?: Record<string, string>;
  events?: Record<string, (...args: any) => void>;
}

class MenuItem extends Component<MenuItemProps> {
  constructor(props: MenuItemProps) {
    super({ ...props });
  }

  protected render() {
    return this.compile(MenuItemTemplate, this.props);
  }
}

export default MenuItem;
