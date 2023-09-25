import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'renderer/components/Button/Button';
import FormSelectTeacher from 'renderer/components/FormSelectTeacher/FormSelectTeacher';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCourseAssignTeacher.module.scss';

type Props = {
  assignedTeachers?: string[];
  courseID: string;
  onSubmitCallback: () => void;
};

type FormFields = {
  teacher: string;
};

const FormCourseAssignTeacher = ({
  assignedTeachers,
  courseID,
  onSubmitCallback,
}: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    servicesAxios.courses
      .assignTeacherToCourse(courseID, { teacherID: data.teacher })
      .then((res) => {
        onSubmitCallback();
        setModal({
          icon: <IconSuccess />,
          text: 'Course information successfully updated!',
          title: 'Success',
        });
        setModalVisibility(true);
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__body}>
        <Heading level={3}>Assign teacher</Heading>
        <div className={styles.form__fields}>
          <FormSelectTeacher
            control={control}
            exclude={
              assignedTeachers && assignedTeachers.length !== 0
                ? assignedTeachers
                : null
            }
            errors={errors.teacher}
            label="Teacher"
            name="teacher"
          />
        </div>
        <Button submit>Assign teacher</Button>
      </div>
    </form>
  );
};

FormCourseAssignTeacher.defaultProps = {
  assignedTeachers: null,
};

export default FormCourseAssignTeacher;
