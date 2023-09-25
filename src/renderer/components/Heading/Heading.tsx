import React from 'react';
import styles from './Heading.module.scss';

type HeadingProps = {
  children: React.ReactNode | string;
  level: number;
};

const Heading = ({ children, level }: HeadingProps) => {
  const Tag = `h${level}`;
  const Title = Tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return <Title className={styles[`h${level}`]}>{children}</Title>;
};

export default Heading;
