import api from './axios';

export interface ICourseTeachingFormats {
  addTeachingFormat: (params: { name: string }) => Promise<any>;
  getTeachingFormatById: (id: string) => Promise<any>;
  getTeachingFormats: () => Promise<any>;
  removeTeachingFormat: (id: string) => Promise<any>;
}

const services: ICourseTeachingFormats = {
  addTeachingFormat(params) {
    return api.post('course_teaching_formats', params);
  },
  getTeachingFormatById(id) {
    return api.get(`course_teaching_formats/${id}`);
  },
  getTeachingFormats() {
    return api.get('course_teaching_formats');
  },
  removeTeachingFormat(id) {
    return api.delete(`course_teaching_formats/${id}`);
  },
};

export default services;
