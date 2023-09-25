import { useForm, SubmitHandler } from 'react-hook-form';
import useStore from 'renderer/store/store';
import Badge from 'renderer/components/Badge/Badge';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import Heading from 'renderer/components/Heading/Heading';
import CourseTeachingFormat from 'renderer/models/CourseTeachingFormat';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCourseTeachingFormats.module.scss';

type FormCourseTeachingFormatsFields = {
  name: string;
};

const FormCourseTeachingFormats = () => {
  const courseTeachingFormats = useStore(
    (state) => state.courseTeachingFormats
  );
  const setCourseTeachingFormats = useStore(
    (state) => state.setCourseTeachingFormats
  );
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCourseTeachingFormatsFields>({
    defaultValues: { name: '' },
  });

  const onSubmit: SubmitHandler<FormCourseTeachingFormatsFields> = async (
    data
  ) => {
    servicesAxios.courseTeachingFormats
      .addTeachingFormat(data)
      .then((res) => {
        setCourseTeachingFormats(res.data);
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
          <Heading level={5}>Teaching Formats</Heading>
        </div>
        <div className={styles.component__input}>
          <FormInput
            errors={errors.name}
            label="Teaching format"
            placeholder="Enter teaching format"
            type="text"
            {...register('name', {
              required: 'This field is required',
            })}
          />
        </div>
        <Button submit>Add</Button>
      </form>
      <div className={styles.component__divider} />
      <div className={styles.component__results}>
        {courseTeachingFormats?.map(
          (teachingFormat: CourseTeachingFormat, index: number) => {
            return (
              <Badge
                key={String(teachingFormat.name + index)}
                color="#00A6FF"
                size="middle"
                text={teachingFormat.name}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default FormCourseTeachingFormats;
