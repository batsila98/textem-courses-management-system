import React, { useState } from 'react';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import FormCourseEnrollStudent from 'renderer/components/FormCourseEnrollStudent/FormCourseEnrollStudent';
import FormCourseStudentCertificate from 'renderer/components/FormCourseStudentCertificate/FormCourseStudentCertificate';
import IconEye from 'renderer/components/svg.library/IconEye';
import IconPen from 'renderer/components/svg.library/IconPen';
import IconTrash from 'renderer/components/svg.library/IconTrash';
import ModalWindow from 'renderer/components/ModalWindow/ModalWindow';
import { NavLink } from 'react-router-dom';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './TableCourseStudents.module.scss';

type Props = {
  courseID: string;
  onRemove: () => void;
  students?: [
    {
      _id: string;
      full_name: string;
      courses?: [{ course: string; certificate: string }] | undefined;
    }
  ];
};

const TableCourseStudents = ({ courseID, onRemove, students }: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [editStudent, setEditStudent] = useState<string>('');

  const removeStudentFromCourse = (studentID: string) => {
    servicesAxios.courses
      .removeStudentFromCourse(courseID, { studentID })
      .then((res) => {
        setModal({
          icon: <IconSuccess />,
          text: 'Student was successfully removed from course!',
          title: 'Success',
        });
        setModalVisibility(true);
        onRemove();
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  };

  return (
    <div className={styles.component}>
      <table>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Name</th>
            <th style={{ width: '40%' }}>Certificate</th>
            <th style={{ width: '30%' }}>Actions</th>
          </tr>
        </thead>

        {students && students?.length > 0 && (
          <tbody>
            {students.map((student) => {
              const studentCertificate =
                student.courses?.find((course) => {
                  return course.course === courseID;
                })?.certificate || '';

              return (
                <tr key={String(student._id)}>
                  <td>{student.full_name}</td>
                  <td>
                    <FormCourseStudentCertificate
                      courseID={courseID}
                      studentCertificate={studentCertificate}
                      studentID={student._id}
                    />
                  </td>
                  <td>
                    <div className={styles.component__buttons}>
                      <NavLink
                        to={`/students/${student._id}`}
                        className={styles.component__button}
                      >
                        <IconEye />
                      </NavLink>
                      <button
                        className={styles.component__button}
                        onClick={() => setEditStudent(student._id)}
                        type="button"
                      >
                        <IconPen />
                      </button>
                      <button
                        className={styles.component__button}
                        onClick={() => removeStudentFromCourse(student._id)}
                        type="button"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {editStudent && (
        <ModalWindow onCloseAction={() => setEditStudent('')}>
          <FormCourseEnrollStudent
            courseID={courseID}
            onSubmitCallback={() => {
              setEditStudent('');
            }}
            studentID={editStudent}
          />
        </ModalWindow>
      )}
    </div>
  );
};

TableCourseStudents.defaultProps = {
  students: undefined,
};

export default TableCourseStudents;
