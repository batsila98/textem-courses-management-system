import TypeUser from 'renderer/models/User';
import api from './axios';

export interface IUsers {
  getUserByUsername: (params: { username: string }) => Promise<any>;
  updateUser: (id: string, params: TypeUser) => Promise<any>;
}

const services: IUsers = {
  getUserByUsername(params) {
    return api.get('users', { params });
  },
  updateUser(id, params) {
    return api.put(`users/${id}`, params);
  },
};

export default services;
