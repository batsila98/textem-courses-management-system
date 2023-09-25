import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import IconPen from 'renderer/components/svg.library/IconPen';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypeStudent from 'renderer/models/Student';
import styles from './TableStudentCourses.module.scss';

type Props = {
  student: TypeStudent;
};

const TableStudentCourses = ({ student }: Props) => {
  const courses = useMemo(() => {
    return student.courses;
  }, [student.courses]);

  return (
    <div className={styles.component}>
      {courses && courses.length ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Certificate</th>
              <th>Type</th>
              <th>Access</th>
              <th>Enrollment date</th>
              <th>End access date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr key={String(course._id + index)}>
                  <td>{course.course.name}</td>
                  <td>{course?.certificate?.name || '-'}</td>
                  <td>{course.course.type.name}</td>
                  <td>{course.access ? 'True' : 'False'}</td>
                  <td>
                    {new Date(course.date_enrollment).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(course.date_access_end).toLocaleDateString()}
                  </td>
                  <td>
                    <NavLink
                      to={`/courses/${course.course._id}`}
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

export default TableStudentCourses;
