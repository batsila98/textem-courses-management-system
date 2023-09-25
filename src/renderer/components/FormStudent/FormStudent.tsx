import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormTextarea from 'renderer/components/FormTextarea/FormTextarea';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import PublishingArea from 'renderer/components/PublishingArea/PublishingArea';
import TypeStudent from 'renderer/models/Student';
import TypeStudentStatus from 'renderer/models/StudentStatus';
import TypeGender from 'renderer/models/Gender';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormStudent.module.scss';

type Props = {
  student: TypeStudent;
};

const FormStudent = ({ student }: Props) => {
  const navigate = useNavigate();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const studentStatuses = useStore((state) => state.studentStatuses);
  const genders = useStore((state) => state.genders);
  const [studentData] = useState<object>({
    author: student.author,
    comment: student.comment,
    email: student.email,
    full_name: student.full_name,
    gender: student.gender?._id,
    status: student.status?._id,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeStudent>({
    defaultValues: studentData,
  });

  const onSubmit: SubmitHandler<TypeStudent> = async (data) => {
    if (student._id) {
      servicesAxios.students
        .updateStudent(student._id, data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'Student information successfully updated!',
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
    } else {
      servicesAxios.students
        .createStudent(data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'The student was successfully created!',
            title: 'Success',
          });
          setModalVisibility(true);
          navigate(`/students/${res.data._id}`);
          return res.data;
        })
        .catch((err) => {
          setModal({
            text: String(err.response.data.message),
            title: 'Fail',
          });
          setModalVisibility(true);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__body}>
        <Heading level={4}>General information</Heading>

        <div className={styles.form__fields}>
          <div className={styles.form__column}>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.full_name}
                label="Full name"
                placeholder="Enter full name"
                type="text"
                {...register('full_name', {
                  required: 'This field is required',
                })}
              />
              <FormSelect
                control={control}
                errors={errors.status}
                label="Status:"
                name="status"
                required="This field is required"
                options={
                  studentStatuses &&
                  studentStatuses.map((status: TypeStudentStatus) => {
                    return {
                      value: status._id,
                      label: status.name,
                    };
                  })
                }
              />
            </div>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.email}
                label="Email"
                placeholder="Enter email"
                type="email"
                {...register('email', { required: 'This field is required' })}
              />
              <FormSelect
                control={control}
                errors={errors.gender}
                label="Gender:"
                name="gender"
                options={
                  genders &&
                  genders.map((gender: TypeGender) => {
                    return {
                      value: gender._id,
                      label: gender.name,
                    };
                  })
                }
              />
            </div>
          </div>
          <div className={styles.form__column}>
            <FormTextarea
              errors={errors.comment}
              label="Comment:"
              placeholder="Enter comment"
              {...register('comment', { required: 'This field is required' })}
            />
          </div>
        </div>
      </div>

      <PublishingArea
        content={
          <>
            <div style={{ fontWeight: 500 }}>
              Author:
              <span
                style={{ fontWeight: 400 }}
              >{` ${student.author.full_name}`}</span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Creation date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(student.date_creation).toLocaleDateString()}`}
              </span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Last modification date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(student.date_modification).toLocaleDateString()}`}
              </span>
            </div>
          </>
        }
        submit={<Button submit>{student._id ? 'Update' : 'Create'}</Button>}
      />
    </form>
  );
};

export default FormStudent;
