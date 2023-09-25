import { useForm, SubmitHandler } from 'react-hook-form';
import Badge from 'renderer/components/Badge/Badge';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormInputColor from 'renderer/components/FormInputColor/FormInputColor';
import Heading from 'renderer/components/Heading/Heading';
import TypeCourseStatus from 'renderer/models/CourseStatus';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCourseStatuses.module.scss';

type FormCourseStatusesFields = {
  name: string;
  color: string;
};

const FormCourseStatuses = () => {
  const courseStatuses = useStore((state) => state.courseStatuses);
  const setCourseStatuses = useStore((state) => state.setCourseStatuses);
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCourseStatusesFields>({
    defaultValues: { name: '', color: '#3EB1C8' },
  });

  const onSubmit: SubmitHandler<FormCourseStatusesFields> = async (data) => {
    servicesAxios.courseStatuses
      .addStatus(data)
      .then((res) => {
        setCourseStatuses(res.data);
        reset();
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.component__form}
      >
        <div className={styles.component__heading}>
          <Heading level={5}>Statuses</Heading>
        </div>
        <div className={styles.component__input}>
          <FormInput
            errors={errors.name}
            label="Status"
            placeholder="Enter status"
            type="text"
            {...register('name', { required: 'This field is required' })}
          />
        </div>
        <div className={styles.component__inputColor}>
          <FormInputColor
            errors={errors.color}
            label="Color"
            {...register('color', { required: 'This field is required' })}
          />
        </div>
        <Button submit>Add</Button>
      </form>
      <div className={styles.component__divider} />
      <div className={styles.component__results}>
        {courseStatuses.map((status: TypeCourseStatus, index: number) => {
          return (
            <Badge
              key={String(status.name + index)}
              color={status.color}
              size="middle"
              text={status.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormCourseStatuses;
