import React, { useEffect, useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Heading from 'renderer/components/Heading/Heading';
import servicesAxios from 'renderer/services/axios';
import styles from './ChartStudentsCertificates.module.scss';

type CustomLabel = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};

type Data = {
  certificate: string;
  number: number;
};

const COLORS = ['#0084D9', '#00A6FF', '#00ddff'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: CustomLabel) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return Number((percent * 100).toFixed(0)) !== 0 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <div className={styles.component__legendList}>
      {payload.map((entry: any, index: number) => (
        <div
          key={`item-${String(entry.color + index)}`}
          className={styles.component__legendItem}
        >
          <span
            className={styles.component__legendPoint}
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </div>
      ))}
    </div>
  );
};

const ChartStudentsCertificates = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    servicesAxios.students
      .getNumberOfStudentsByCertificates()
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
      <Heading level={5}>Success of graduates</Heading>
      <div className={styles.component__content}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={styles.component__chartWrapper}
        >
          <PieChart className={styles.component__chart}>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              label={renderCustomizedLabel}
              labelLine={false}
              dataKey="quantity"
              nameKey="certificate"
              outerRadius={130}
              fill="#00A6FF"
            >
              {data.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${entry.certificate}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Pie>
            <Legend
              align="left"
              content={renderLegend}
              iconSize={20}
              iconType="circle"
              layout="vertical"
              margin={{
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              }}
              verticalAlign="middle"
              width={220}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartStudentsCertificates;
