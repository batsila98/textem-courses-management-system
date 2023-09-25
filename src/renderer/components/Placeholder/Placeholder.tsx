import React from 'react';
import IconDecorationDocument from 'renderer/components/svg.library/IconDecorationDocument';
import styles from './Placeholder.module.scss';

type Props = {
  icon?: React.ReactNode;
  text?: string;
};

const Placeholder = ({ icon, text }: Props) => {
  return (
    <div className={styles.component}>
      <div className={styles.component__icon}>{icon}</div>
      <div className={styles.component__text}>{text}</div>
    </div>
  );
};

Placeholder.defaultProps = {
  icon: <IconDecorationDocument />,
  text: 'There is no content yet',
};

export default Placeholder;
