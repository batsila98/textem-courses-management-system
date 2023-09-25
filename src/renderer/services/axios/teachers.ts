import TypeTeacher from 'renderer/models/Teacher';
import api from './axios';

export interface ITeachers {
  createTeacher: (params: TypeTeacher) => Promise<any>;
  filter: (params: { language: string }) => Promise<any>;
  getByName: (params: { full_name: string }) => Promise<any>;
  getTeacherById: (params: { id: string }) => Promise<any>;
  getTeachers: () => Promise<any>;
  getTopTeachers: () => Promise<any>;
  getTotal: () => Promise<any>;
  updateTeacher: (id: string, params: TypeTeacher) => Promise<any>;
}

const services: ITeachers = {
  createTeacher(params) {
    return api.post('teachers', params);
  },
  filter(params) {
    return api.get('teachers', { params });
  },
  getByName(params) {
    return api.get('teachers', { params });
  },
  getTeacherById(params) {
    return api.get(`teachers/${params.id}`);
  },
  getTeachers() {
    return api.get('teachers');
  },
  getTopTeachers() {
    return api.get('teachers/top');
  },
  getTotal() {
    return api.get('teachers/total');
  },
  updateTeacher(id, params) {
    return api.put(`teachers/${id}`, params);
  },
};

export default services;
