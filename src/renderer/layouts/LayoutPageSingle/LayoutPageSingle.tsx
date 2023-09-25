import React from 'react';
import styles from './LayoutPageSingle.module.scss';

type Props = {
  content?: React.ReactNode;
  form?: React.ReactNode;
};

const LayoutPageSingle = ({ content, form }: Props) => {
  return (
    <div className={styles.component}>
      {form && <div className={styles.component__form}>{form}</div>}
      {content && <div className={styles.component__content}>{content}</div>}
    </div>
  );
};

LayoutPageSingle.defaultProps = {
  content: null,
  form: null,
};

export default LayoutPageSingle;
