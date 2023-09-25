import TypeCourse from 'renderer/models/Course';
import TypeGender from './Gender';

export type SocialNetwork = {
  name: string;
  url: string;
};

export type PhoneNumber = {
  number: string;
};

export type TeacherLanguage = {
  language: {
    _id: string;
    name: string;
  };
  skills: string[];
};

type Teacher = {
  _id: string;
  author: {
    _id: string;
    full_name: string;
  };
  courses?: TypeCourse[];
  email: string;
  full_name: string;
  gender: TypeGender;
  phones?: PhoneNumber[];
  social_networks?: SocialNetwork[];
  date_creation: Date | number;
  date_modification: Date | number;
  languages: TeacherLanguage[];
};

export default Teacher;
