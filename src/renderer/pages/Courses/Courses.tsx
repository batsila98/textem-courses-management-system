import React, { useEffect, useState } from 'react';
import useStore from 'renderer/store/store';
import FormFilterCourses from 'renderer/components/FormFilterCourses/FormFilterCourses';
import FormSearch from 'renderer/components/FormSearch/FormSearch';
import Header from 'renderer/components/Header/Header';
import LayoutPageWithList from 'renderer/layouts/LayoutPageWithList/LayoutPageWithList';
import PaginationBar, {
  TypePagination,
} from 'renderer/components/PaginationBar/PaginationBar';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TableCourses from 'renderer/components/TableCourses/TableCourses';
import TypeCourse from 'renderer/models/Course';
import servicesAxios from 'renderer/services/axios';
import styles from './Courses.module.scss';

const Courses = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [courses, setCourses] = useState<TypeCourse[]>([]);
  const [coursesTotal, setCoursesTotal] = useState<number>(0);
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
    servicesAxios.courses
      .getCourses()
      .then((res) => {
        setCourses(res.data.results);
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

    servicesAxios.courses
      .getTotal()
      .then((res) => {
        setCoursesTotal(res.data);
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
        courses && courses.length ? (
          <TableCourses courses={courses} />
        ) : (
          <Placeholder />
        )
      }
      filtes={
        <FormFilterCourses
          setData={setCourses}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
      header={
        <Header
          badge={`${coursesTotal} entries found`}
          navLinkTo="/courses/create"
          title="Courses"
        />
      }
      pagination={
        <PaginationBar
          filtersQuery={filtersQuery}
          pagination={pagination}
          setData={setCourses}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
      search={<FormSearch setResultData={setCourses} />}
    />
  );
};

export default Courses;
