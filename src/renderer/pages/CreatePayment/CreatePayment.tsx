import React, { useMemo, useState } from 'react';
import FormPayment from 'renderer/components/FormPayment/FormPayment';
import TypePayment from 'renderer/models/Payment';
import TypeUser from 'renderer/models/User';
import styles from './CreatePayment.module.scss';

const CreatePayment = () => {
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);
  const payment: TypePayment = {
    _id: '',
    author: {
      _id: user._id,
      full_name: user.full_name,
    },
    balance: 0,
    billing: '',
    student: {
      _id: '',
      full_name: '',
    },
    course: {
      _id: '',
      name: '',
    },
    debt: 0,
    discount: 0,
    mails: [],
    payment_plan: [
      {
        date_deadline: new Date(),
        paid_amount: 0,
        payment_number: '',
        status: 'not paid',
        sum: 0,
      },
    ],
    sum: 0,
    date_creation: new Date(),
    date_modification: new Date(),
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <FormPayment payment={payment} />
      </div>
    </div>
  );
};

export default CreatePayment;
