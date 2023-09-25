import React from 'react';
import { NavLink } from 'react-router-dom';
import IconPen from 'renderer/components/svg.library/IconPen';
import TypePayment from 'renderer/models/Payment';
import styles from './TablePayments.module.scss';

type Props = {
  payments: TypePayment[];
};

const TablePayments = ({ payments }: Props) => {
  return (
    <table className={styles.component}>
      <thead className={styles.component__thead}>
        <tr className={styles.component__theadRow}>
          <th style={{ width: '20%' }}>Student</th>
          <th style={{ width: '20%' }}>Course</th>
          <th style={{ width: '10%' }}>Sum</th>
          <th style={{ width: '10%' }}>Left To Pay</th>
          <th style={{ width: '10%' }}>Debt</th>
          <th style={{ width: '10%' }}>Discount</th>
          <th style={{ width: '12%' }}>Date created</th>
          <th style={{ width: '8%' }}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.component__tbody}>
        {payments?.map((payment) => {
          return (
            <tr key={payment._id} className={styles.component__tbodyRow}>
              <td>{payment.student.full_name}</td>
              <td>{payment.course.name}</td>
              <td>{`${payment.sum} PLN`}</td>
              <td>{`${payment.balance} PLN`}</td>
              <td>{`${payment.debt} PLN`}</td>
              <td>{`${payment.discount} PLN`}</td>
              <td>{new Date(payment.date_creation).toLocaleDateString()}</td>
              <td>
                <NavLink
                  to={`/payments/${payment._id}`}
                  className={styles.component__tbodyLink}
                >
                  <IconPen />
                </NavLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TablePayments;
