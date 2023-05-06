import BaseAPI from './BaseAPI';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  request(): Promise<User> {
    return this.http?.get('/user');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthAPI();
