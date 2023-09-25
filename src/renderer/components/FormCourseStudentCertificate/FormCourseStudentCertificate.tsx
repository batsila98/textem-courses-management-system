import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormSelectCertificate from 'renderer/components/FormSelectCertificate/FormSelectCertificate';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCourseStudentCertificate.module.scss';

type Props = {
  courseID: string;
  studentCertificate: string;
  studentID: string;
};

type FormFields = {
  certificate: string;
};

const FormCourseStudentCertificate = ({
  studentCertificate,
  courseID,
  studentID,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      certificate: studentCertificate,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {};

  const updateCertificate = (certificate: string) => {
    servicesAxios.students
      .addCertificate(studentID, { certificate, courseID })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__body}>
        <div className={styles.form__fields}>
          <FormSelectCertificate
            control={control}
            errors={errors.certificate}
            name="certificate"
            setCertificate={(certificate: string) =>
              updateCertificate(certificate)
            }
          />
        </div>
      </div>
    </form>
  );
};

export default FormCourseStudentCertificate;
