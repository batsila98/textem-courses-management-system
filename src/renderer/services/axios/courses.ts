import TypeCourse from 'renderer/models/Course';
import api from './axios';

export interface ICourses {
  enrollStudentToCourse: (courseID: string, params: any) => Promise<any>;
  assignTeacherToCourse: (
    courseID: string,
    params: { teacherID: string }
  ) => Promise<any>;
  createCourse: (params: TypeCourse) => Promise<any>;
  filter: (params: {
    duration_min: number;
    duration_max: number;
    price_min: number;
    price_max: number;
    status: string;
    teaching_format: string;
    type: string;
  }) => Promise<any>;
  getByName: (params: { name: string }) => Promise<any>;
  getCourseById: (params: { id: string }) => Promise<any>;
  getCourses: (params?: { limit: number }) => Promise<any>;
  getTotal: () => Promise<any>;
  removeStudentFromCourse: (
    courseID: string,
    params: { studentID: string }
  ) => Promise<any>;
  removeTeacherFromCourse: (
    courseID: string,
    params: { teacherID: string }
  ) => Promise<any>;
  updateCourse: (id: string, params: TypeCourse) => Promise<any>;
}

const services: ICourses = {
  enrollStudentToCourse(courseID, params) {
    return api.put(`courses/${courseID}/enroll_student`, params);
  },
  assignTeacherToCourse(courseID, params) {
    return api.put(`courses/${courseID}/assign_teacher`, params);
  },
  createCourse(params) {
    return api.post('courses', params);
  },
  filter(params) {
    return api.get('courses', { params });
  },
  getByName(params) {
    return api.get('courses', { params });
  },
  getCourseById(params) {
    return api.get(`courses/${params.id}`);
  },
  getCourses(params) {
    return api.get('courses', { params });
  },
  getTotal() {
    return api.get('courses/total');
  },
  removeStudentFromCourse(courseID, params) {
    return api.put(`courses/${courseID}/remove_student`, params);
  },
  removeTeacherFromCourse(courseID, params) {
    return api.put(`courses/${courseID}/remove_teacher`, params);
  },
  updateCourse(id, params) {
    return api.put(`courses/${id}`, params);
  },
};

export default services;
