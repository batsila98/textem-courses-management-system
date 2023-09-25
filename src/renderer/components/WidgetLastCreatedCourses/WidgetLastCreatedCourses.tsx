import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Heading from 'renderer/components/Heading/Heading';
import IconClock from 'renderer/components/svg.library/IconClock';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypeCourse from 'renderer/models/Course';
import servicesAxios from 'renderer/services/axios';
import styles from './WidgetLastCreatedCourses.module.scss';

const WidgetLastCreatedCourses = () => {
  const [courses, setCourses] = useState<{
    pagination: object;
    results: TypeCourse[];
  }>({
    pagination: {},
    results: [],
  });

  useEffect(() => {
    servicesAxios.courses
      .getCourses({ limit: 6 })
      .then((res) => {
        setCourses(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.component}>
      <Heading level={5}>Last created courses</Heading>
      <div className={styles.component__list}>
        {courses.results && courses.results.length ? (
          courses.results.map((course) => {
            return (
              <NavLink
                className={styles.component__listItem}
                key={course._id}
                to={`/courses/${course._id}`}
              >
                <div className={styles.component__listItemName}>
                  {course.name}
                </div>
                <div
                  className={styles.component__listItemStatus}
                  style={{ color: course.status.color }}
                >
                  {course.status.name}
                </div>
                <div className={styles.component__listItemDate}>
                  <div className={styles.component__listItemIcon}>
                    <IconClock fill="#999" />
                  </div>
                  {new Date(course.date_creation).toLocaleDateString()}
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

export default WidgetLastCreatedCourses;
