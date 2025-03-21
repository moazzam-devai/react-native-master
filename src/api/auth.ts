import {axiosInstance} from './axiosInstance';
import {Login, User} from '../interfaces';

export class Auth {
  static login(data: Login) {
    return axiosInstance.request<User>({
      method: 'post',
      url: '/login',
      data: data,
    });
  }
}
