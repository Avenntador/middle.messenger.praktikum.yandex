import { v4 as uuidv4 } from 'uuid';
import EventBus from './EventBus';

class Component<T extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = uuidv4();

  protected props: T;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  protected children: Record<string, Component | Component[]>;

  constructor(propsWithChildren: T) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: T): {
    props: T;
    children: Record<string, Component | Component[]>;
  } {
    const props: Record<string, any> = {};
    const children: Record<string, Component | Component[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((val) => val instanceof Component)) {
        children[key] = value;
      } else if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as T, children };
  }

  protected get element() {
    return this._element;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        // для навешивания ивента на элемент с wrapperom по селектору
        if (this.props.selector) {
          this._element
            ?.querySelector(this.props.selector)
            ?.addEventListener(eventName, events[eventName]);
        } else {
          this._element.addEventListener(eventName, events[eventName]);
        }
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((childenInArray) => childenInArray.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: T, _newProps: T) {
    return true;
  }

  public setProps = (nextProps: T) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _render() {
    const fragment = this.render();
    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      // убираем template обертку над шаблоном

      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (props: any) => string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        let temp = '';
        child.forEach((item) => {
          temp += `<div data-id="${item.id}"></div>`;
        });
        propsAndStubs[key] = temp;
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = template(propsAndStubs);

    const replaceWithStub = (element: Component) => {
      const stub = fragment.content.querySelector(`[data-id="${element.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(element.getContent() as Node);
    };

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((childInArray) => replaceWithStub(childInArray));
      } else {
        replaceWithStub(child);
      }
    });

    return fragment.content;
  }

  public changePage(pathname: string) {}

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: T) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop as keyof T] = value;

        const newTarget = { ...oldTarget, ...target };

        // обновляем children
        const { children } = self._getChildrenAndProps(newTarget);

        self.children = { ...self.children, ...children };

        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}

export default Component;
