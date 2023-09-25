import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import Heading from 'renderer/components/Heading/Heading';
import servicesAxios from 'renderer/services/axios';
import styles from './ChartNumberOfNewStudents.module.scss';

const ChartNumberOfNewStudents = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    servicesAxios.students
      .getNumberOfNewStudentsOverPeriod()
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.component}>
      <Heading level={5}>New students</Heading>
      <div className={styles.component__content}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={styles.component__chartWrapper}
        >
          <LineChart className={styles.component__chart} data={data}>
            <Line
              dataKey="quantity"
              stroke="#00A6FF"
              strokeWidth={2}
              type="monotone"
            />
            <XAxis
              dataKey="month"
              stroke="#00A6FF"
              strokeWidth={0}
              tickMargin={10}
            />
            <YAxis
              allowDecimals={false}
              stroke="#00A6FF"
              strokeWidth={0}
              tickMargin={10}
              width={24}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartNumberOfNewStudents;
