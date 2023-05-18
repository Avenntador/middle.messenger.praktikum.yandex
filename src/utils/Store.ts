// eslint-disable-next-line max-classes-per-file
import { User } from '../api/AuthAPI';
// eslint-disable-next-line import/no-cycle
import { Message } from '../controllers/MessagesController';
import EventBus from './EventBus';
import set from './helpers/set';
import isEqual from './helpers/isEqual';
import { ChatInfo } from '../api/ChatsAPI';
import Component from './Component';

enum StoreEvents {
  UPDATED = 'updated',
}

interface State {
  currentUser?: User;
  chats?: ChatInfo[];
  messages?: Record<number, Message[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.UPDATED, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return function wrapper(Block: unknown) {
    return class extends (Block as typeof Component) {
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
