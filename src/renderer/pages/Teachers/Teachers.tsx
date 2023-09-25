import React, { useEffect, useState } from 'react';
import useStore from 'renderer/store/store';
import FormFilterTeachers from 'renderer/components/FormFilterTeachers/FormFilterTeachers';
import FormSearch from 'renderer/components/FormSearch/FormSearch';
import Header from 'renderer/components/Header/Header';
import LayoutPageWithList from 'renderer/layouts/LayoutPageWithList/LayoutPageWithList';
import PaginationBar, {
  TypePagination,
} from 'renderer/components/PaginationBar/PaginationBar';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TableTeachers from 'renderer/components/TableTeachers/TableTeachers';
import servicesAxios from 'renderer/services/axios';
import TypeTeacher from 'renderer/models/Teacher';
import styles from './Teachers.module.scss';

const Teachers = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [teachers, setTeachers] = useState<TypeTeacher[]>([]);
  const [teachersTotal, setTeachersTotal] = useState<number>(0);
  const [filtersQuery, setFiltersQuery] = useState<object>({});
  const [pagination, setPagination] = useState<TypePagination>({
    next: {
      page: 0,
    },
    previous: {
      page: 0,
    },
  });

  useEffect(() => {
    servicesAxios.teachers
      .getTeachers()
      .then((res) => {
        setTeachers(res.data.results);
        setPagination(res.data.pagination);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.teachers
      .getTotal()
      .then((res) => {
        setTeachersTotal(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  }, [setModal, setModalVisibility]);

  return (
    <LayoutPageWithList
      content={
        teachers && teachers.length ? (
          <TableTeachers teachers={teachers} />
        ) : (
          <Placeholder />
        )
      }
      filtes={
        <FormFilterTeachers
          setData={setTeachers}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
      header={
        <Header
          badge={`${teachersTotal} entries found`}
          navLinkTo="/teachers/create"
          title="Teachers"
        />
      }
      pagination={
        <PaginationBar
          filtersQuery={filtersQuery}
          pagination={pagination}
          setData={setTeachers}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
      search={<FormSearch setResultData={setTeachers} />}
    />
  );
};

export default Teachers;
