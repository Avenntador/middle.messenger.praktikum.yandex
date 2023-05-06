// eslint-disable-next-line max-classes-per-file
import { User } from '../api/AuthAPI';
import EventBus from './EventBus';
import Component from './Component';
import set from './helpers/set';
import isEqual from './helpers/isEqual';

enum StoreEvents {
  UPDATED = 'updated',
}

interface State {
  currentUser: User;
}

class Store extends EventBus {
  private _state: State | object = {};

  public set(path: string, data: unknown) {
    set(this._state, path, data);

    this.emit(StoreEvents.UPDATED, this.getState());
  }

  public getState() {
    return this._state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => State) {
  return function wrapper(Block: typeof Component) {
    return class extends Block {
      constructor(props: Record<string, any>) {
        let state = mapStateToProps(store.getState() as State);

        super({ ...props, ...state });

        store.on(StoreEvents.UPDATED, () => {
          const newState = mapStateToProps(store.getState() as State);

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}

export default store;
