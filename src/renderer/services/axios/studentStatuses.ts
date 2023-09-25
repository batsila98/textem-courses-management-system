import api from './axios';

export interface IStudentStatuses {
  addStatus: (params: { name: string; color: string }) => Promise<any>;
  getStatusById: (params: { id: string }) => Promise<any>;
  getStatusByName: (params: { name: string }) => Promise<any>;
  getStatuses: () => Promise<any>;
  removeStatus: (statusId: string) => Promise<any>;
}

const services: IStudentStatuses = {
  addStatus(params) {
    return api.post('student_statuses', params);
  },
  getStatusById(params) {
    return api.get(`student_statuses/${params.id}`);
  },
  getStatusByName(params) {
    return api.get('student_statuses', { params });
  },
  getStatuses() {
    return api.get('student_statuses');
  },
  removeStatus(statusId) {
    return api.delete(`student_statuses/${statusId}`);
  },
};

export default services;
