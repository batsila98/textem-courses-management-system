import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FormTeacher from 'renderer/components/FormTeacher/FormTeacher';
import FormTeacherLanguages from 'renderer/pages/SingleTeacher/FormTeacherLanguages/FormTeacherLanguages';
import LayoutPageSingle from 'renderer/layouts/LayoutPageSingle/LayoutPageSingle';
import TableTeacherCourses from 'renderer/components/TableTeacherCourses/TableTeacherCourses';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import TypeTeacher from 'renderer/models/Teacher';
import styles from './SingleTeacher.module.scss';

const SingleTeacher = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const { id } = useParams();
  const [teacher, setTeacher] = useState<TypeTeacher>();

  useEffect(() => {
    if (!id) {
      return;
    }

    servicesAxios.teachers
      .getTeacherById({ id })
      .then((res) => {
        setTeacher(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  }, [id, setModal, setModalVisibility]);

  return (
    <>
      {teacher && (
        <LayoutPageSingle
          content={
            <Tabs>
              <TabList>
                <Tab>Languages</Tab>
                <Tab>Courses</Tab>
              </TabList>
              <TabPanel>
                <FormTeacherLanguages teacher={teacher} />
              </TabPanel>
              <TabPanel>
                <TableTeacherCourses teacher={teacher} />
              </TabPanel>
            </Tabs>
          }
          form={<FormTeacher teacher={teacher} />}
        />
      )}
    </>
  );
};

export default SingleTeacher;
