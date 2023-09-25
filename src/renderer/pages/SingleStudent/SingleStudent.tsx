import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormStudent from 'renderer/components/FormStudent/FormStudent';
import LayoutPageSingle from 'renderer/layouts/LayoutPageSingle/LayoutPageSingle';
import TableStudentCourses from 'renderer/components/TableStudentCourses/TableStudentCourses';
import TableStudentInvoices from 'renderer/components/TableStudentInvoices/TableStudentInvoices';
import TableStudentPayments from 'renderer/components/TableStudentPayments/TableStudentPayments';
import TypeStudent from 'renderer/models/Student';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styles from './SingleStudent.module.scss';

const SingleStudent = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const { id } = useParams();
  const [student, setStudent] = useState<TypeStudent>();

  useEffect(() => {
    if (!id) {
      return;
    }

    servicesAxios.students
      .getStudentById({ id })
      .then((res) => {
        setStudent(res.data);
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
      {student && (
        <LayoutPageSingle
          content={
            <Tabs>
              <TabList>
                {/* <Tab>Statistics</Tab> */}
                <Tab>Courses</Tab>
                <Tab>Payments</Tab>
                <Tab>Invoices</Tab>
              </TabList>

              {/* <TabPanel style={{ backgroundColor: '#ffffff' }}>
              Statistics
              {student.courses?.length !== 0 && (
                <div className={styles.hours}>
                  <StudentCoursesHours courses={student.courses || []} />
                </div>
              )}
            </TabPanel> */}
              <TabPanel style={{ backgroundColor: '#ffffff' }}>
                <TableStudentCourses student={student} />
              </TabPanel>
              <TabPanel style={{ backgroundColor: '#ffffff' }}>
                <TableStudentPayments studentID={student._id} />
              </TabPanel>
              <TabPanel style={{ backgroundColor: '#ffffff' }}>
                <TableStudentInvoices studentID={student._id} />
              </TabPanel>
            </Tabs>
          }
          form={<FormStudent student={student} />}
        />
      )}
    </>
  );
};

export default SingleStudent;
