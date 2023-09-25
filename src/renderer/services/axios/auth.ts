import api from './axios';

export interface IAuth {
  logIn: (params: { password: string; username: string }) => Promise<any>;
  register: (params: {
    email: string;
    full_name: string;
    password: string;
    username: string;
  }) => Promise<any>;
}

const services: IAuth = {
  async logIn(params) {
    return api.post('auth/login', params);
  },
  register(params) {
    return api.post('auth/register', params);
  },
};

export default services;
