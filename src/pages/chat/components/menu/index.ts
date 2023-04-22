import './menu.scss';
import Component from '../../../../utils/Component';
import MenuTemplate from './menu.hbs';
import MenuItem from './menuItem';

interface MenuProps {
  menuItems: MenuItem | MenuItem[];
  styles?: Record<string, string>;
  events?: Record<string, (...args: any) => void>;
}

class Menu extends Component<MenuProps> {
  constructor(props: MenuProps) {
    super({ ...props });
  }

  render() {
    return this.compile(MenuTemplate, this.props);
  }
}

export default Menu;
