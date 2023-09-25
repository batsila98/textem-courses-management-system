import TypeCourseStatus from 'renderer/models/CourseStatus';
import TypeCourseTeachingFormat from 'renderer/models/CourseTeachingFormat';
import TypeCourseType from 'renderer/models/CourseType';

type Course = {
  _id: string;
  author: {
    _id: string;
    full_name: string;
  };
  code: string;
  date_end: Date | number;
  date_start: Date | number;
  duration: number;
  edition_id?: string;
  parent_course?: {
    _id: string;
    name: string;
  };
  name: string;
  price_basic: number;
  related_courses?: [
    {
      _id: string;
      name: string;
    }
  ];
  status: TypeCourseStatus;
  students?: [
    {
      _id: string;
      full_name: string;
      courses?: [
        {
          course: string;
          certificate: string;
        }
      ];
    }
  ];
  teachers?: [
    {
      _id: string;
      full_name: string;
    }
  ];
  teaching_format: TypeCourseTeachingFormat;
  type: TypeCourseType;
  date_creation: Date | number;
  date_modification: Date | number;
};

export default Course;
