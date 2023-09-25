import { useMemo, useState } from 'react';
import FormCourse from 'renderer/components/FormCourse/FormCourse';
import TypeCourse from 'renderer/models/Course';
import TypeUser from 'renderer/models/User';
import styles from './CreateCourse.module.scss';

const CreateCourse = () => {
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);

  const course: TypeCourse = {
    _id: '',
    author: {
      _id: user._id,
      full_name: user.full_name,
    },
    code: '',
    date_end: 0,
    date_start: 0,
    duration: 0,
    edition_id: '',
    name: '',
    price_basic: 0,
    status: {
      _id: '',
      color: '',
      date_creation: new Date(),
      date_modification: new Date(),
      name: '',
    },
    teaching_format: {
      _id: '',
      date_creation: new Date(),
      date_modification: new Date(),
      name: '',
    },
    type: {
      _id: '',
      date_creation: new Date(),
      date_modification: new Date(),
      name: '',
    },
    date_creation: new Date(),
    date_modification: new Date(),
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <FormCourse course={course} />
      </div>
    </div>
  );
};

export default CreateCourse;
