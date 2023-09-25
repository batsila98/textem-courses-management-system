import React from 'react';
import styles from './PublishingArea.module.scss';

type Props = {
  content: React.ReactNode | React.ReactNode[];
  submit: React.ReactNode | React.ReactNode[];
};

const PublishingArea = ({ content, submit }: Props) => {
  return (
    <div className={styles.component}>
      <div className={styles.component__body}>
        <div className={styles.component__content}>{content}</div>
        <div className={styles.component__submit}>{submit}</div>
      </div>
    </div>
  );
};

export default PublishingArea;
