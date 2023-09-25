import React from 'react';
import { NavLink } from 'react-router-dom';
import IconPen from 'renderer/components/svg.library/IconPen';
import TypeInvoice from 'renderer/models/Invoice';
import styles from './TableInvoices.module.scss';

type Props = {
  invoices: TypeInvoice[];
};

const TableInvoices = ({ invoices }: Props) => {
  return (
    <table className={styles.component}>
      <thead className={styles.component__thead}>
        <tr className={styles.component__theadRow}>
          <th style={{ width: '20%' }}>Student</th>
          <th style={{ width: '20%' }}>Course</th>
          <th style={{ width: '16%' }}>Invoice number</th>
          <th style={{ width: '8%' }}>Date</th>
          <th style={{ width: '10%' }}>Sum</th>
          <th style={{ width: '8%' }}>Type</th>
          <th style={{ width: '10%' }}>Date created</th>
          <th style={{ width: '8%' }}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.component__tbody}>
        {invoices?.map((invoice) => {
          return (
            <tr key={invoice._id} className={styles.component__tbodyRow}>
              <td>{invoice.student.full_name}</td>
              <td>{invoice.course.name}</td>
              <td>{invoice.invoice_number}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>{`${invoice.sum} PLN`}</td>
              <td>{invoice.type?.name}</td>
              <td>{new Date(invoice.date_creation).toLocaleDateString()}</td>
              <td>
                <NavLink
                  to={`/invoices/${invoice._id}`}
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

export default TableInvoices;
