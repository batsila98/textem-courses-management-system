import api from './axios';

export interface IGenders {
  addGender: (params: { name: string }) => Promise<any>;
  getGenderById: (id: string) => Promise<any>;
  getGenders: () => Promise<any>;
  removeGender: (id: string) => Promise<any>;
}

const services: IGenders = {
  addGender(params) {
    return api.post('genders', params);
  },
  getGenderById(id) {
    return api.get(`genders/${id}`);
  },
  getGenders() {
    return api.get('genders');
  },
  removeGender(id) {
    return api.delete(`genders/${id}`);
  },
};

export default services;
