import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import { NavLink } from 'react-router-dom';
import IconEye from 'renderer/components/svg.library/IconEye';
import IconPen from 'renderer/components/svg.library/IconPen';
import IconTrash from 'renderer/components/svg.library/IconTrash';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './TableCourseTeachers.module.scss';

type Props = {
  courseID: string;
  onRemove: () => void;
  teachers?: [{ _id: string; full_name: string }];
};

const TableCourseTeachers = ({ courseID, onRemove, teachers }: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);

  const removeTeacherFromCourse = (teacherID: string) => {
    servicesAxios.courses
      .removeTeacherFromCourse(courseID, { teacherID })
      .then((res) => {
        setModal({
          icon: <IconSuccess />,
          text: 'Teacher was successfully removed from course!',
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
            <th style={{ width: '80%' }}>Name</th>
            <th style={{ width: '30%' }}>Actions</th>
          </tr>
        </thead>

        {teachers && teachers?.length > 0 && (
          <tbody>
            {teachers.map((teacher) => {
              return (
                <tr key={String(teacher._id)}>
                  <td>{teacher.full_name}</td>
                  <td>
                    <div className={styles.component__buttons}>
                      <NavLink
                        to={`/teachers/${teacher._id}`}
                        className={styles.component__button}
                      >
                        <IconEye />
                      </NavLink>
                      <button
                        className={styles.component__button}
                        onClick={() => removeTeacherFromCourse(teacher._id)}
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
    </div>
  );
};

TableCourseTeachers.defaultProps = {
  teachers: [],
};

export default TableCourseTeachers;
