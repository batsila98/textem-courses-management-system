import React, { useMemo, useState } from 'react';
import FormInvoice from 'renderer/components/FormInvoice/FormInvoice';
import TypeInvoice from 'renderer/models/Invoice';
import TypeUser from 'renderer/models/User';
import styles from './CreateInvoice.module.scss';

const CreateInvoice = () => {
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);
  const invoice: TypeInvoice = {
    _id: '',
    author: {
      _id: user._id,
      full_name: user.full_name,
    },
    student: {
      _id: '',
      full_name: '',
    },
    course: {
      _id: '',
      name: '',
    },
    date: new Date(),
    invoice_number: '',
    sum: 0,
    type: '',
    date_creation: new Date(),
    date_modification: new Date(),
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <FormInvoice invoice={invoice} />
      </div>
    </div>
  );
};

export default CreateInvoice;
