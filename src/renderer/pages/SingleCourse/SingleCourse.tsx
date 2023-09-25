import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'renderer/components/Button/Button';
import TableCourseStudents from 'renderer/components/TableCourseStudents/TableCourseStudents';
import TableCourseTeachers from 'renderer/components/TableCourseTeachers/TableCourseTeachers';
import FormCourse from 'renderer/components/FormCourse/FormCourse';
import FormCourseAssignTeacher from 'renderer/components/FormCourseAssignTeacher/FormCourseAssignTeacher';
import FormCourseEnrollStudent from 'renderer/components/FormCourseEnrollStudent/FormCourseEnrollStudent';
import Heading from 'renderer/components/Heading/Heading';
import LayoutPageSingle from 'renderer/layouts/LayoutPageSingle/LayoutPageSingle';
import ModalWindow from 'renderer/components/ModalWindow/ModalWindow';
import TypeCourse from 'renderer/models/Course';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './SingleCourse.module.scss';

const SingleCourse = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const { id } = useParams();
  const [course, setCourse] = useState<TypeCourse>();
  const [isEnrollStudent, setIsEnrollStudent] = useState<boolean>(false);
  const [isAssignTeacher, setIsAssignTeacher] = useState<boolean>(false);

  const fetchData = useCallback(() => {
    if (!id) {
      return;
    }
    servicesAxios.courses
      .getCourseById({ id })
      .then((res) => {
        setCourse(res.data);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {course && (
        <LayoutPageSingle
          content={
            <>
              <div className={styles.component__content}>
                <div className={styles.component__section}>
                  <div className={styles.component__sectionHeading}>
                    <Heading level={4}>Students</Heading>
                    <Button
                      onClick={() => setIsEnrollStudent((current) => !current)}
                      variant="primary"
                    >
                      Enroll student
                    </Button>
                  </div>
                  <div className={styles.component__sectionTable}>
                    <TableCourseStudents
                      courseID={course._id}
                      onRemove={fetchData}
                      students={course.students}
                    />
                  </div>
                </div>
                <div className={styles.component__section}>
                  <div className={styles.component__sectionHeading}>
                    <Heading level={4}>Teachers</Heading>
                    <Button
                      onClick={() => setIsAssignTeacher((current) => !current)}
                      variant="primary"
                    >
                      Add teacher
                    </Button>
                  </div>
                  <div className={styles.component__sectionTable}>
                    <TableCourseTeachers
                      courseID={course._id}
                      onRemove={fetchData}
                      teachers={course.teachers}
                    />
                  </div>
                </div>
              </div>
              {isEnrollStudent && (
                <ModalWindow
                  onCloseAction={() =>
                    setIsEnrollStudent((current) => !current)
                  }
                >
                  <FormCourseEnrollStudent
                    courseID={course._id}
                    enrolledStudents={course.students?.map(
                      (student) => student._id
                    )}
                    onSubmitCallback={() => {
                      fetchData();
                      setIsEnrollStudent((current) => !current);
                    }}
                  />
                </ModalWindow>
              )}
              {isAssignTeacher && (
                <ModalWindow
                  onCloseAction={() =>
                    setIsAssignTeacher((current) => !current)
                  }
                >
                  <FormCourseAssignTeacher
                    assignedTeachers={course.teachers?.map(
                      (teacher) => teacher._id
                    )}
                    courseID={course._id}
                    onSubmitCallback={() => {
                      fetchData();
                      setIsAssignTeacher((current) => !current);
                    }}
                  />
                </ModalWindow>
              )}
            </>
          }
          form={<FormCourse course={course} />}
        />
      )}
    </>
  );
};

export default SingleCourse;
