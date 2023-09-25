import React from 'react';
import { NavLink } from 'react-router-dom';
import Badge from 'renderer/components/Badge/Badge';
import IconPen from 'renderer/components/svg.library/IconPen';
import TypeCourse from 'renderer/models/Course';
import styles from './TableCourses.module.scss';

type Props = {
  courses: TypeCourse[];
};

const TableCourses = ({ courses }: Props) => {
  return (
    <table className={styles.component}>
      <thead className={styles.component__thead}>
        <tr className={styles.component__theadRow}>
          <th style={{ width: '20%' }}>Name</th>
          <th style={{ width: '10%' }}>Type</th>
          <th style={{ width: '12%' }}>Teaching format</th>
          <th style={{ width: '6%' }}>Status</th>
          <th style={{ width: '10%' }}>Basic Price</th>
          <th style={{ width: '8%' }}>Duration</th>
          <th style={{ width: '16%' }}>Dates</th>
          <th style={{ width: '10%' }}>Date created</th>
          <th style={{ width: '8%' }}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.component__tbody}>
        {courses?.map((course) => {
          return (
            <tr key={course._id} className={styles.component__tbodyRow}>
              <td>{course.name}</td>
              <td>{course.type?.name}</td>
              <td>{course.teaching_format?.name}</td>
              <td>
                <Badge
                  color={course.status?.color}
                  size="middle"
                  text={course.status?.name}
                />
              </td>
              <td>{`${course.price_basic} PLN`}</td>
              <td>{`${course.duration} hours`}</td>
              <td>
                {`${new Date(
                  course.date_start
                ).toLocaleDateString()} - ${new Date(
                  course.date_end
                ).toLocaleDateString()}`}
              </td>
              <td>{new Date(course.date_creation).toLocaleDateString()}</td>
              <td>
                <NavLink
                  to={`/courses/${course._id}`}
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

export default TableCourses;
