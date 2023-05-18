import AuthApi, { SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import Router from '../utils/Router';

class AuthController {
  private authApi: typeof AuthApi;

  constructor() {
    this.authApi = AuthApi;
  }

  async signin(data: SigninData) {
    try {
      this.authApi.signin(data).then(() => {
        this.getCurrentUser();
        Router.go('/messenger');
      });
    } catch (e) {
      console.log(e);
    }
  }

  async signup(data: SignupData) {
    try {
      this.authApi.signup(data).then(() => {
        this.getCurrentUser();
        Router.go('/messenger');
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getCurrentUser() {
    const currentUser = await this.authApi.request();

    store.set('currentUser', JSON.parse(currentUser as unknown as string));
  }

  async logout() {
    try {
      await this.authApi.logout();

      Router.go('/');
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
