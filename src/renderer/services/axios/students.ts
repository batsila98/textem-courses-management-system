import TypeStudent from 'renderer/models/Student';
import api from './axios';

export interface IStudents {
  addCertificate: (
    studentID: string,
    params: { certificate: string; courseID: string }
  ) => Promise<any>;
  addCourseToStudent: (
    studentID: string,
    params: {
      access: boolean;
      comment: string;
      course: string;
      date_access_end: Date;
      date_enrollment: Date;
      status: string;
    }
  ) => Promise<any>;
  createStudent: (params: TypeStudent) => Promise<any>;
  editStudentsCourseData: (studentID: string, params: object) => Promise<any>;
  filter: (params: { gender: string; status: string }) => Promise<any>;
  getStudentById: (params: { id: string }) => Promise<any>;
  getByName: (params: { full_name: string }) => Promise<any>;
  getStudents: (params?: { limit: number }) => Promise<any>;
  getNumberOfStudentsByCertificates: () => Promise<any>;
  getNumberOfNewStudentsOverPeriod: () => Promise<any>;
  getTotal: () => Promise<any>;
  // removeCourseFromStudent: (
  //   id: string,
  //   params: { courseID: string }
  // ) => Promise<any>;
  updateStudent: (id: string, params: TypeStudent) => Promise<any>;
}

const services: IStudents = {
  addCertificate(studentID, params) {
    return api.put(`students/${studentID}/add_certificate`, params);
  },
  addCourseToStudent(studentID, params) {
    return api.put(`students/${studentID}/add_course`, params);
  },
  createStudent(params) {
    return api.post('students', params);
  },
  editStudentsCourseData(studentID, params) {
    return api.put(`students/${studentID}/edit_course`, params);
  },
  filter(params) {
    return api.get('students', { params });
  },
  getStudentById(params) {
    return api.get(`students/${params.id}`);
  },
  getByName(params) {
    return api.get('students', { params });
  },
  getStudents(params) {
    return api.get('students', { params });
  },
  getNumberOfStudentsByCertificates() {
    return api.get('students/number_of_students_by_certificates');
  },
  getNumberOfNewStudentsOverPeriod() {
    return api.get('students/number_of_new_students_over_period');
  },
  getTotal() {
    return api.get('students/total');
  },
  // removeCourseFromStudent(id, params) {
  //   return api.put(`students/${id}/remove_course`, params);
  // },
  updateStudent(id, params) {
    return api.put(`students/${id}`, params);
  },
};

export default services;
