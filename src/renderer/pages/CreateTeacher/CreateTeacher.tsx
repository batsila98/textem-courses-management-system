import React, { useMemo, useState } from 'react';
import FormTeacher from 'renderer/components/FormTeacher/FormTeacher';
import TypeTeacher from 'renderer/models/Teacher';
import TypeUser from 'renderer/models/User';
import styles from './CreateTeacher.module.scss';

const CreateTeacher = () => {
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);

  const teacher: TypeTeacher = {
    _id: '',
    author: {
      _id: user._id,
      full_name: user.full_name,
    },
    email: '',
    full_name: '',
    gender: {
      _id: '',
      date_creation: new Date(),
      date_modification: new Date(),
      name: '',
    },
    languages: [],
    phones: [
      {
        number: '',
      },
    ],
    social_networks: [
      {
        name: '',
        url: '',
      },
    ],
    date_creation: new Date(),
    date_modification: new Date(),
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <FormTeacher teacher={teacher} />
      </div>
    </div>
  );
};

export default CreateTeacher;
