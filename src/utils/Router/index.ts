/* eslint-disable max-classes-per-file */
import Component from '../Component';
import renderDom from '../renderDom';

interface ComponentConstructable<P extends Record<string, any> = any> {
  new (props: P): Component<P>;
}

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

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: ComponentConstructable) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#root');
