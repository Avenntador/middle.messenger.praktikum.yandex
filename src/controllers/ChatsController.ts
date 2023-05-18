import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.getChats({ title: '' });
  }

  async getChats(data: { title: string }) {
    const chats = await this.api.request(data);

    store.set('chats', JSON.parse(chats as unknown as string));
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  deleteUsersFromChat(id: number, userId: number) {
    this.api.deleteUsers(id, [userId]);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  async selectChat(id: number) {
    MessagesController.closeAll();

    const token = await this.getToken(id);

    await MessagesController.connect(id, token);

    store.set('selectedChat', id);
  }
}

const controller = new ChatsController();

export default controller;
