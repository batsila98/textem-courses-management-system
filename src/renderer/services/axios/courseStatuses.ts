import api from './axios';

export interface ICourseStatuses {
  addStatus: (params: { name: string; color: string }) => Promise<any>;
  getStatusById: (params: { id: string }) => Promise<any>;
  getStatusByName: (params: { name: string }) => Promise<any>;
  getStatuses: () => Promise<any>;
  removeStatus: (statusId: string) => Promise<any>;
}

const services: ICourseStatuses = {
  addStatus(params) {
    return api.post('course_statuses', params);
  },
  getStatusById(params) {
    return api.get(`course_statuses/${params.id}`);
  },
  getStatusByName(params) {
    return api.get('course_statuses', { params });
  },
  getStatuses() {
    return api.get('course_statuses');
  },
  removeStatus(statusId) {
    return api.delete(`course_statuses/${statusId}`);
  },
};

export default services;
