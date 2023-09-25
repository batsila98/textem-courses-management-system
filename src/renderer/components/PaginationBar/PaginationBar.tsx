import React, { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import IconArrowToLeft from 'renderer/components/svg.library/IconArrowToLeft';
import IconArrowToRight from 'renderer/components/svg.library/IconArrowToRight';
import servicesAxios from 'renderer/services/axios';
import styles from './PaginationBar.module.scss';

export type TypePagination = {
  next: {
    page: number;
  };
  previous: {
    page: number;
  };
};

type Props = {
  filtersQuery: any;
  pagination: TypePagination;
  setData: Dispatch<SetStateAction<any>>;
  setFiltersQuery: Dispatch<SetStateAction<object>>;
  setPagination: Dispatch<SetStateAction<TypePagination>>;
};

const PaginationBar = ({
  filtersQuery,
  pagination,
  setData,
  setFiltersQuery,
  setPagination,
}: Props) => {
  const location = useLocation();

  const goToPage = (page: number) => {
    filtersQuery.page = page;

    if (location.pathname === '/students') {
      servicesAxios.students
        .filter(filtersQuery)
        .then((res) => {
          setData(res.data.results);
          setFiltersQuery(filtersQuery);
          setPagination(res.data.pagination);
          return res.data;
        })
        .catch((err) => {
          alert(err);
        });
    }

    if (location.pathname === '/courses') {
      servicesAxios.courses
        .filter(filtersQuery)
        .then((res) => {
          setData(res.data.results);
          setFiltersQuery(filtersQuery);
          setPagination(res.data.pagination);
          return res.data;
        })
        .catch((err) => {
          alert(err);
        });
    }

    if (location.pathname === '/invoices') {
      servicesAxios.invoices
        .filter(filtersQuery)
        .then((res) => {
          setData(res.data.results);
          setFiltersQuery(filtersQuery);
          setPagination(res.data.pagination);
          return res.data;
        })
        .catch((err) => {
          alert(err);
        });
    }

    if (location.pathname === '/payments') {
      servicesAxios.payments
        .filter(filtersQuery)
        .then((res) => {
          setData(res.data.results);
          setFiltersQuery(filtersQuery);
          setPagination(res.data.pagination);
          return res.data;
        })
        .catch((err) => {
          alert(err);
        });
    }

    if (location.pathname === '/teachers') {
      servicesAxios.teachers
        .filter(filtersQuery)
        .then((res) => {
          setData(res.data.results);
          setFiltersQuery(filtersQuery);
          setPagination(res.data.pagination);
          return res.data;
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div className={styles.component}>
      <button
        className={styles.component__button}
        disabled={!pagination.previous}
        onClick={() => goToPage(pagination?.previous?.page)}
        type="button"
      >
        <IconArrowToLeft fill="#00A6FF" />
      </button>
      <span className={styles.component__text}>
        Page {filtersQuery.page || 1}
      </span>
      <button
        className={styles.component__button}
        disabled={!pagination.next}
        onClick={() => goToPage(pagination?.next?.page)}
        type="button"
      >
        <IconArrowToRight fill="#00A6FF" />
      </button>
    </div>
  );
};

export default PaginationBar;
