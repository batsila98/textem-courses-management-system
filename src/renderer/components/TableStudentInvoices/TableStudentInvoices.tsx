import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useStore from 'renderer/store/store';
import IconPen from 'renderer/components/svg.library/IconPen';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypeInvoice from 'renderer/models/Invoice';
import servicesAxios from 'renderer/services/axios';
import styles from './TableStudentInvoices.module.scss';

type Props = {
  studentID: string;
};

const TableStudentInvoices = ({ studentID }: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [invoices, seInvoices] = useState<TypeInvoice[]>([]);

  useEffect(() => {
    servicesAxios.invoices
      .getInvoicesByStudent({ student: studentID })
      .then((res) => {
        seInvoices(res.data.results);
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
      {invoices && invoices.length ? (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Invoice number</th>
              <th>Date</th>
              <th>Sum</th>
              <th>Type</th>
              <th>Date created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => {
              return (
                <tr key={String(invoice._id + index)}>
                  <td>{invoice.course.name}</td>
                  <td>{invoice.invoice_number}</td>
                  <td>{new Date(invoice.date).toLocaleDateString()}</td>
                  <td>{`${invoice.sum} PLN`}</td>
                  <td>{invoice.type.name}</td>
                  <td>
                    {new Date(invoice.date_creation).toLocaleDateString()}
                  </td>
                  <td>
                    <NavLink
                      to={`/invoices/${invoice._id}`}
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

export default TableStudentInvoices;
