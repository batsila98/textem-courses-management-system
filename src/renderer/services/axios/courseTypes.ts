import api from './axios';

export interface ICourseTypes {
  addCourseType: (params: { name: string }) => Promise<any>;
  getCourseTypeById: (id: string) => Promise<any>;
  getCourseTypes: () => Promise<any>;
  removeCourseType: (id: string) => Promise<any>;
}

const services: ICourseTypes = {
  addCourseType(params) {
    return api.post('course_types', params);
  },
  getCourseTypeById(id) {
    return api.get(`course_types/${id}`);
  },
  getCourseTypes() {
    return api.get('course_types');
  },
  removeCourseType(id) {
    return api.delete(`course_types/${id}`);
  },
};

export default services;
