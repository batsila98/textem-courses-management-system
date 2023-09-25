import React, { useMemo, useState } from 'react';
import FormStudent from 'renderer/components/FormStudent/FormStudent';
import TypeStudent from 'renderer/models/Student';
import TypeUser from 'renderer/models/User';
import styles from './CreateStudent.module.scss';

const CreateStudent = () => {
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);

  const student: TypeStudent = {
    _id: '',
    author: {
      _id: user._id,
      full_name: user.full_name,
    },
    comment: '',
    email: '',
    gender: {
      _id: '',
      date_creation: new Date(),
      date_modification: new Date(),
      name: '',
    },
    full_name: '',
    status: {
      _id: '',
      color: '',
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
        <FormStudent student={student} />
      </div>
    </div>
  );
};

export default CreateStudent;
