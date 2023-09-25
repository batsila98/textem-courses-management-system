import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Heading from 'renderer/components/Heading/Heading';
import IconClock from 'renderer/components/svg.library/IconClock';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypeStudent from 'renderer/models/Student';
import servicesAxios from 'renderer/services/axios';
import styles from './WidgetLastCreatedStudents.module.scss';

const WidgetLastCreatedStudents = () => {
  const [students, setStudents] = useState<{
    pagination: object;
    results: TypeStudent[];
  }>({
    pagination: {},
    results: [],
  });

  useEffect(() => {
    servicesAxios.students
      .getStudents({ limit: 6 })
      .then((res) => {
        setStudents(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.component}>
      <Heading level={5}>Last created students</Heading>
      <div className={styles.component__list}>
        {students.results && students.results.length ? (
          students.results.map((student) => {
            return (
              <NavLink
                className={styles.component__listItem}
                key={student._id}
                to={`/students/${student._id}`}
              >
                <div className={styles.component__listItemName}>
                  {student.full_name}
                </div>
                <div
                  className={styles.component__listItemStatus}
                  style={{ color: student.status.color }}
                >
                  {student.status.name}
                </div>
                <div className={styles.component__listItemDate}>
                  <div className={styles.component__listItemIcon}>
                    <IconClock fill="#999" />
                  </div>
                  {new Date(student.date_creation).toLocaleDateString()}
                </div>
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

export default WidgetLastCreatedStudents;
