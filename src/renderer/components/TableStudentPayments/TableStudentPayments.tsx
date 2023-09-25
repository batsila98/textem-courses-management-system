import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useStore from 'renderer/store/store';
import IconPen from 'renderer/components/svg.library/IconPen';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypePayment from 'renderer/models/Payment';
import servicesAxios from 'renderer/services/axios';
import styles from './TableStudentPayments.module.scss';

type Props = {
  studentID: string;
};

const TableStudentPayments = ({ studentID }: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [payments, setPayments] = useState<TypePayment[]>([]);

  useEffect(() => {
    servicesAxios.payments
      .getPaymentsByStudent({ student: studentID })
      .then((res) => {
        setPayments(res.data.results);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  }, [setModal, setModalVisibility, studentID]);

  return (
    <div className={styles.component}>
      {payments && payments.length ? (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Sum</th>
              <th>Left To Pay</th>
              <th>Debt</th>
              <th>Discount</th>
              <th>Date created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              return (
                <tr key={String(payment._id + index)}>
                  <td>{payment.course.name}</td>
                  <td>{`${payment.sum} PLN`}</td>
                  <td>{`${payment.balance} PLN`}</td>
                  <td>{`${payment.debt} PLN`}</td>
                  <td>{`${payment.discount} PLN`}</td>
                  <td>
                    {new Date(payment.date_creation).toLocaleDateString()}
                  </td>
                  <td>
                    <NavLink
                      to={`/payments/${payment._id}`}
                      className={styles.component__icon}
                    >
                      <IconPen />
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default TableStudentPayments;
