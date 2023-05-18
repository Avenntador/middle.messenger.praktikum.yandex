import store from '../utils/Store';
import UserAPI, { ChangeProfileData, ChangePassword } from '../api/UserAPI';

class UserController {
  private userApi: typeof UserAPI;

  constructor() {
    this.userApi = UserAPI;
  }

  async changeProfile(data: ChangeProfileData) {
    try {
      const currentUser = await this.userApi.changeProfile(data);

      store.set('currentUser', JSON.parse(currentUser as unknown as string));
    } catch (e) {
      console.log(e);
    }
  }

  async changePassword(data: ChangePassword) {
    try {
      await this.userApi.changePassword(data);
    } catch (e) {
      console.log(e);
    }
  }

  async changeAvatar(file: FormData) {
    try {
      const currentUser = await this.userApi.changeAvatar(file);

      store.set('currentUser', JSON.parse(currentUser as unknown as string));
    } catch (e) {
      console.log(e);
    }
  }

  async getUserByLogin(login: string) {
    return this.userApi.getUserByLogin(login);
  }
}

export default new UserController();
