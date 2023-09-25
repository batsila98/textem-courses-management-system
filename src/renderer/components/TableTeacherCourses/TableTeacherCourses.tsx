import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import IconPen from 'renderer/components/svg.library/IconPen';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypeTeacher from 'renderer/models/Teacher';
import styles from './TableTeacherCourses.module.scss';

type Props = {
  teacher: TypeTeacher;
};

const TableTeacherCourses = ({ teacher }: Props) => {
  const courses = useMemo(() => {
    return teacher.courses;
  }, [teacher.courses]);

  return (
    <div className={styles.component}>
      {courses && courses.length ? (
        <table>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '10%' }}>Type</th>
              <th style={{ width: '10%' }}>Teaching format</th>
              <th style={{ width: '8%' }}>Status</th>
              <th style={{ width: '10%' }}>Basic Price</th>
              <th style={{ width: '8%' }}>Duration</th>
              <th style={{ width: '16%' }}>Dates</th>
              <th style={{ width: '10%' }}>Date created</th>
              <th style={{ width: '8%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr
                  key={String(course._id + index)}
                  className={styles.component__tbodyRow}
                >
                  <td>{course.name}</td>
                  <td>{course.type?.name}</td>
                  <td>{course.teaching_format?.name}</td>
                  <td>{course.status?.name}</td>
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

export default TableTeacherCourses;
