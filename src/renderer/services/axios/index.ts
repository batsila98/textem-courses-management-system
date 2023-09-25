import auth, { IAuth } from './auth';
import certificates, { ICertificates } from './certificates';
import students, { IStudents } from './students';
import studentStatuses, { IStudentStatuses } from './studentStatuses';
import courses, { ICourses } from './courses';
import courseStatuses, { ICourseStatuses } from './courseStatuses';
import courseTeachingFormats, {
  ICourseTeachingFormats,
} from './courseTeachingFormats';
import courseTypes, { ICourseTypes } from './courseTypes';
import genders, { IGenders } from './genders';
import invoices, { IInvoices } from './invoices';
import invoiceTypes, { IInvoiceTypes } from './invoiceTypes';
import languages, { ILanguages } from './languages';
import notifications, { INotifications } from './notifications';
import payments, { IPayments } from './payments';
import teachers, { ITeachers } from './teachers';
import users, { IUsers } from './users';

interface Services {
  auth: IAuth;
  certificates: ICertificates;
  students: IStudents;
  studentStatuses: IStudentStatuses;
  courseTeachingFormats: ICourseTeachingFormats;
  courseTypes: ICourseTypes;
  courses: ICourses;
  courseStatuses: ICourseStatuses;
  genders: IGenders;
  invoices: IInvoices;
  invoiceTypes: IInvoiceTypes;
  languages: ILanguages;
  notifications: INotifications;
  payments: IPayments;
  teachers: ITeachers;
  users: IUsers;
}

const services: Services = {
  auth,
  certificates,
  students,
  studentStatuses,
  courses,
  courseStatuses,
  courseTeachingFormats,
  courseTypes,
  genders,
  invoices,
  invoiceTypes,
  languages,
  notifications,
  payments,
  teachers,
  users,
};

export default services;
