import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Heading from 'renderer/components/Heading/Heading';
import IconClock from 'renderer/components/svg.library/IconClock';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypePayment from 'renderer/models/Payment';
import servicesAxios from 'renderer/services/axios';
import styles from './WidgetLastCreatedPayments.module.scss';

const WidgetLastCreatedPayments = () => {
  const [payments, setPayments] = useState<{
    pagination: object;
    results: TypePayment[];
  }>({
    pagination: {},
    results: [],
  });

  useEffect(() => {
    servicesAxios.payments
      .getPayments({ limit: 6 })
      .then((res) => {
        setPayments(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.component}>
      <Heading level={5}>Last created payments</Heading>
      <div className={styles.component__list}>
        {payments.results && payments.results.length ? (
          payments.results.map((payment) => {
            return (
              <NavLink
                className={styles.component__listItem}
                key={payment._id}
                to={`/payments/${payment._id}`}
              >
                <div className={styles.component__listItemStudent}>
                  {payment.student.full_name}
                </div>
                <div className={styles.component__listItemCourse}>
                  {payment.course.name}
                </div>
                <div className={styles.component__listItemDate}>
                  <div className={styles.component__listItemIcon}>
                    <IconClock fill="#999" />
                  </div>
                  {new Date(payment.date_creation).toLocaleDateString()}
                </div>
                <div
                  className={styles.component__listItemSum}
                >{`${payment.sum} PLN`}</div>
              </NavLink>
            );
          })
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};

export default WidgetLastCreatedPayments;
