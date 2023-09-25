import React, { useEffect, useState } from 'react';
import { useOutsideClick } from 'renderer/hooks/useOutsideClick';
import Button from 'renderer/components/Button/Button';
import IconClose from 'renderer/components/svg.library/IconClose';
import styles from './SelectedFilters.module.scss';

type Props = {
  filters: { name: string; value: string | number }[];
  resetAllFilters: () => void;
  resetSingleFilter: (key: any) => void;
};

const SelectedFilters = ({
  filters,
  resetAllFilters,
  resetSingleFilter,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const componentRef = useOutsideClick(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className={styles.component} ref={componentRef}>
      <Button
        variant="secondary"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {`${filters.length} selected filters`}
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          resetAllFilters();
        }}
      >
        Reset all filters
      </Button>
      {isOpen && (
        <div className={styles.component__list}>
          {filters.map((item, index) => {
            return (
              <div key={item.name} className={styles.component__listItem}>
                <div className={styles.component__listItemContent}>
                  <span className={styles.component__listItemName}>
                    {item.name}:
                  </span>
                  <span className={styles.component__listItemValue}>
                    {item.value}
                  </span>
                </div>
                <div className={styles.component__listItemDivider} />
                <button
                  type="button"
                  onClick={() => resetSingleFilter(item.name)}
                  className={styles.component__listItemButton}
                >
                  <IconClose fill="#00A6FF" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectedFilters;
