// import api from './axios';

// export interface SettingsServices {
//   addCourseTeachingFormat: (params: {
//     course_teaching_format: string;
//   }) => Promise<any>;
//   addCourseType: (params: { course_type: string }) => Promise<any>;
//   addGender: (params: { gender: string }) => Promise<any>;
//   addInvoiceType: (params: { invoice_type: string }) => Promise<any>;
//   getByName: (params: { name: string }) => Promise<any>;
//   getById: (params: { settingId: string }) => Promise<any>;
//   getSettings: () => Promise<any>;
//   removeCourseTeachingFormat: (params: {
//     course_teaching_format: string;
//   }) => Promise<any>;
//   removeCourseType: (params: { course_type: string }) => Promise<any>;
//   removeGender: (params: { gender: string }) => Promise<any>;
//   removeInvoiceType: (params: { invoice_type: string }) => Promise<any>;
// }

// const services: SettingsServices = {
//   addCourseTeachingFormat(params) {
//     return api.put('settings/add_course_teaching_format', params);
//   },
//   addCourseType(params) {
//     return api.put('settings/add_course_type', params);
//   },
//   addGender(params) {
//     return api.put('settings/add_gender', params);
//   },
//   addInvoiceType(params) {
//     return api.put('settings/add_invoice_type', params);
//   },
//   getById(params) {
//     return api.get(`settings/${params.settingId}`);
//   },
//   getByName(params) {
//     return api.get('settings', { params });
//   },
//   getSettings() {
//     return api.get('settings');
//   },
//   removeCourseTeachingFormat(params) {
//     return api.put('settings/remove_course_teaching_format', params);
//   },
//   removeCourseType(params) {
//     return api.put('settings/remove_course_type', params);
//   },
//   removeGender(params) {
//     return api.put('settings/remove_gender', params);
//   },
//   removeInvoiceType(params) {
//     return api.put('settings/remove_invoice_type', params);
//   },
// };

// export default services;
