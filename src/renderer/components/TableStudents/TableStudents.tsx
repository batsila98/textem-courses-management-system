import React from 'react';
import { NavLink } from 'react-router-dom';
import Badge from 'renderer/components/Badge/Badge';
import IconPen from 'renderer/components/svg.library/IconPen';
import TypeStudent from 'renderer/models/Student';
import styles from './TableStudents.module.scss';

type Props = {
  students: TypeStudent[];
};

const TableStudents = ({ students }: Props) => {
  return (
    <table className={styles.component}>
      <thead className={styles.component__thead}>
        <tr className={styles.component__theadRow}>
          <th style={{ width: '30%' }}>Name</th>
          <th style={{ width: '30%' }}>Email</th>
          <th style={{ width: '10%' }}>Status</th>
          <th style={{ width: '10%' }}>Gender</th>
          <th style={{ width: '12%' }}>Date Created</th>
          <th style={{ width: '8%' }}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.component__tbody}>
        {students?.map((student) => {
          return (
            <tr key={student._id} className={styles.component__tbodyRow}>
              <td>{student.full_name}</td>
              <td>{student.email}</td>
              <td>
                <Badge
                  color={student.status.color}
                  size="middle"
                  text={student.status?.name}
                />
              </td>
              <td>{student.gender?.name}</td>
              <td>{new Date(student.date_creation).toLocaleDateString()}</td>
              <td>
                <NavLink
                  to={`/students/${student._id}`}
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

export default TableStudents;
