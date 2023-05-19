import Component from '../Component';
import renderDom from '../renderDom';
// eslint-disable-next-line import/no-cycle
import { ComponentConstructable } from '.';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  private block: Component | null = null;

  constructor(
    private pathname: string,
    private readonly BlockClass: ComponentConstructable,
    private readonly query: string,
  ) {}

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass({});

      renderDom(this.query, this.block);
    }
  }
}

export default Route;
