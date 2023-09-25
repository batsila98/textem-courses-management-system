import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useOutsideClick } from 'renderer/hooks/useOutsideClick';
import IconPen from 'renderer/components/svg.library/IconPen';
import TypeTeacher from 'renderer/models/Teacher';
import styles from './TableTeachers.module.scss';

type Props = {
  teachers: TypeTeacher[];
};

type PopupListProps = {
  items: string[];
};

const PopupList = ({ items }: PopupListProps) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const componentRef = useOutsideClick(() => {
    if (isListOpen) {
      setIsListOpen(false);
    }
  });

  return (
    <div className={styles.popupList} ref={componentRef}>
      <button
        type="button"
        className={styles.popupList__button}
        onClick={() => {
          setIsListOpen((current) => !current);
        }}
      >
        {`and ${items.length} more...`}
      </button>
      {isListOpen && (
        <div className={styles.popupList__list}>
          {items?.map((item: string, index: number) => {
            return (
              <div
                key={String(item + index)}
                className={styles.popupList__listItem}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const TableTeachers = ({ teachers }: Props) => {
  return (
    <table className={styles.component}>
      <thead className={styles.component__thead}>
        <tr className={styles.component__theadRow}>
          <th style={{ width: '30%' }}>Name</th>
          <th style={{ width: '20%' }}>Email</th>
          <th style={{ width: '15%' }}>Phone numbers</th>
          <th style={{ width: '15%' }}>Languages</th>
          <th style={{ width: '12%' }}>Date Created</th>
          <th style={{ width: '8%' }}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.component__tbody}>
        {teachers?.map((teacher) => {
          return (
            <tr key={teacher._id} className={styles.component__tbodyRow}>
              <td>{teacher.full_name}</td>
              <td>{teacher.email}</td>
              <td>
                <div className={styles.list}>
                  {teacher.phones &&
                    teacher.phones.length > 0 &&
                    teacher.phones[0]?.number &&
                    teacher.phones[0]?.number}

                  {teacher.phones && teacher.phones.length > 1 && (
                    <PopupList
                      items={teacher.phones.map((item) => item.number)}
                    />
                  )}
                </div>
              </td>
              <td>
                <div className={styles.list}>
                  {teacher.languages[0]?.language &&
                    teacher.languages[0]?.language.name}

                  {teacher.languages.length > 1 && (
                    <PopupList
                      items={teacher.languages.map(
                        (item) => item.language.name
                      )}
                    />
                  )}
                </div>
              </td>
              <td>{new Date(teacher.date_creation).toLocaleDateString()}</td>
              <td>
                <NavLink
                  to={`/teachers/${teacher._id}`}
                  className={styles.component__tbodyLink}
                >
                  <IconPen />
                </NavLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTeachers;
