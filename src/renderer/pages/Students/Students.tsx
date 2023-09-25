import React, { useEffect, useState } from 'react';
import useStore from 'renderer/store/store';
import FormFilterStudents from 'renderer/components/FormFilterStudents/FormFilterStudents';
import FormSearch from 'renderer/components/FormSearch/FormSearch';
import Header from 'renderer/components/Header/Header';
import LayoutPageWithList from 'renderer/layouts/LayoutPageWithList/LayoutPageWithList';
import PaginationBar, {
  TypePagination,
} from 'renderer/components/PaginationBar/PaginationBar';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TableStudents from 'renderer/components/TableStudents/TableStudents';
import TypeStudent from 'renderer/models/Student';
import servicesAxios from 'renderer/services/axios';
import styles from './Students.module.scss';

const Students = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [students, setStudents] = useState<TypeStudent[]>([]);
  const [studentsTotal, setStudentsTotal] = useState<number>(0);
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
    servicesAxios.students
      .getStudents()
      .then((res) => {
        setStudents(res.data.results);
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

    servicesAxios.students
      .getTotal()
      .then((res) => {
        setStudentsTotal(res.data);
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
        students && students.length ? (
          <TableStudents students={students} />
        ) : (
          <Placeholder />
        )
      }
      filtes={
        <FormFilterStudents
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
          setStudents={setStudents}
        />
      }
      header={
        <Header
          badge={`${studentsTotal} entries found`}
          navLinkTo="/students/create"
          title="Students"
        />
      }
      pagination={
        <PaginationBar
          filtersQuery={filtersQuery}
          pagination={pagination}
          setData={setStudents}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
      search={<FormSearch setResultData={setStudents} />}
    />
  );
};

export default Students;
