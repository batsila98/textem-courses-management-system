import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Heading from 'renderer/components/Heading/Heading';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypeTeacher from 'renderer/models/Teacher';
import servicesAxios from 'renderer/services/axios';
import styles from './WidgetTopTeachers.module.scss';

const WidgetTopTeachers = () => {
  const [teachers, setTeachers] = useState<TypeTeacher[]>([]);

  useEffect(() => {
    servicesAxios.teachers
      .getTopTeachers()
      .then((res) => {
        setTeachers(res.data);
        return res.data;
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className={styles.component}>
      <Heading level={5}>Top teachers by number of courses</Heading>
      <div className={styles.component__list}>
        {teachers && teachers.length ? (
          teachers.map((item, index) => {
            return (
              <NavLink
                className={styles.component__listItem}
                key={item._id}
                to={`/teachers/${item._id}`}
              >
                <div className={styles.component__listItemName}>
                  {item.full_name}
                </div>
                <div className={styles.component__listItemValue}>
                  {item.courses?.length}
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

export default WidgetTopTeachers;
