import BaseAPI from './BaseAPI';
import { User } from './AuthAPI';

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  mine?: boolean;
  last_message?: {
    user: User;
    time: string;
    content: string;
  };
  events?: Record<string, () => void>;
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(title: string) {
    return this.http.post('/', { title });
  }

  delete(id: string): Promise<unknown> {
    return this.http.delete('/', { chatId: id });
  }

  request(data: { title: string }): Promise<ChatInfo[]> {
    return this.http.get('/', data);
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId: id });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post(`/token/${id}`);

    return JSON.parse(response as string).token;
  }

  update = undefined;
}

export default new ChatsAPI();
