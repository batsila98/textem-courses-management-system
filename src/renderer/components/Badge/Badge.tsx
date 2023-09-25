import React from 'react';
import classNames from 'classnames';
import styles from './Badge.module.scss';

type Props = {
  color?: string;
  size: 'small' | 'middle' | 'large';
  text: string;
};

const Badge = ({ color, size, text }: Props) => {
  return (
    <div
      className={classNames(styles.component, styles[`component_${size}`])}
      style={{
        borderColor: color,
        color,
      }}
    >
      {text}
    </div>
  );
};

Badge.defaultProps = {
  color: '#171717',
};

export default Badge;
