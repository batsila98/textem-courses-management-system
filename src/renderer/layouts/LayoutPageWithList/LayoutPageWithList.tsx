import React from 'react';
import styles from './LayoutPageWithList.module.scss';

type Props = {
  content?: React.ReactNode;
  filtes?: React.ReactNode;
  header?: React.ReactNode;
  pagination?: React.ReactNode;
  search?: React.ReactNode;
};

const LayoutPageWithList = ({
  content,
  filtes,
  header,
  pagination,
  search,
}: Props) => {
  return (
    <div className={styles.component}>
      {header && <div className={styles.component__header}>{header}</div>}
      <div className={styles.component__controls}>
        {filtes && <div className={styles.component__filters}>{filtes}</div>}
        {search && <div className={styles.component__search}>{search}</div>}
        {pagination && (
          <div className={styles.component__pagination}>{pagination}</div>
        )}
      </div>
      {content && <div className={styles.component__content}>{content}</div>}
    </div>
  );
};

LayoutPageWithList.defaultProps = {
  content: null,
  filtes: null,
  header: null,
  pagination: null,
  search: null,
};

export default LayoutPageWithList;
