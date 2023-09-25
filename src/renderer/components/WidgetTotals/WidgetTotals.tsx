import React, { useEffect, useState } from 'react';
import IconEducationHat from 'renderer/components/svg.library/IconEducationHat';
import IconStand from 'renderer/components/svg.library/IconStand';
import IconStudents from 'renderer/components/svg.library/IconStudents';
import servicesAxios from 'renderer/services/axios';
import styles from './WidgetTotals.module.scss';

type WidgetTotalsParams = {
  students?: number;
  courses?: number;
  teachers?: number;
};

const WidgetTotals = () => {
  const [totals, setTotals] = useState<WidgetTotalsParams>({
    students: 0,
    courses: 0,
    teachers: 0,
  });

  useEffect(() => {
    Promise.allSettled([
      servicesAxios.students.getTotal(),
      servicesAxios.courses.getTotal(),
      servicesAxios.teachers.getTotal(),
    ])
      .then((results) => {
        setTotals({
          students: results[0]?.value?.data,
          courses: results[1]?.value?.data,
          teachers: results[2]?.value?.data,
        });
        return results;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.component}>
      <div className={styles.component__card}>
        <div className={styles.component__cardIcon}>
          <IconStand fill="#00A6FF" />
        </div>
        <div className={styles.component__cardContent}>
          <span className={styles.component__cardName}>Courses</span>
          <span className={styles.component__cardValue}>
            {totals.courses || 0}
          </span>
        </div>
      </div>
      <div className={styles.component__card}>
        <div className={styles.component__cardIcon}>
          <IconStudents fill="#00A6FF" />
        </div>
        <div className={styles.component__cardContent}>
          <span className={styles.component__cardName}>Students</span>
          <span className={styles.component__cardValue}>
            {totals.students || 0}
          </span>
        </div>
      </div>
      <div className={styles.component__card}>
        <div className={styles.component__cardIcon}>
          <IconEducationHat fill="#00A6FF" />
        </div>
        <div className={styles.component__cardContent}>
          <span className={styles.component__cardName}>Teachers</span>
          <span className={styles.component__cardValue}>
            {totals.teachers || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WidgetTotals;
