import { User } from './AuthAPI';
import BaseAPI from './BaseAPI';

export interface ChangeProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangedProfile {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: ChangeProfileData): Promise<ChangedProfile> {
    return this.http.put('/profile', data);
  }

  changePassword(data: ChangePassword) {
    return this.http.put('/password', data);
  }

  changeAvatar(file: FormData) {
    return this.http.put('/profile/avatar', file);
  }

  getUserByLogin(login: string): Promise<User> {
    return this.http.post('/search', { login });
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  request = undefined;
}

export default new UserAPI();
