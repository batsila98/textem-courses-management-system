import TypeCertificate from './Certificate';
import TypeCourseType from './CourseType';
import TypeGender from './Gender';
import TypeStudentStatus from './StudentStatus';

export type StudentCourse = {
  access: boolean;
  date_access_end: Date;
  date_enrollment: Date;
  certificate?: TypeCertificate;
  comment: string;
  course: {
    _id: string;
    date_end?: Date;
    duration?: number;
    name: string;
    type: TypeCourseType;
  };
  _id: string;
  status: string;
};

type Student = {
  _id: string;
  author: {
    _id: string;
    full_name: string;
  };
  comment: string;
  courses?: StudentCourse[];
  email: string;
  gender: TypeGender;
  full_name: string;
  payments?: object[];
  status: TypeStudentStatus;
  date_creation: Date | number;
  date_modification: Date | number;
};

export default Student;
