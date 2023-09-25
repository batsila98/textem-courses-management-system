import { useForm, SubmitHandler } from 'react-hook-form';
import useStore from 'renderer/store/store';
import Badge from 'renderer/components/Badge/Badge';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import Heading from 'renderer/components/Heading/Heading';
import TypeCourseType from 'renderer/models/CourseType';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCourseTypes.module.scss';

type FormCourseTypesFields = {
  name: string;
};

const FormCourseTypes = () => {
  const courseTypes = useStore((state) => state.courseTypes);
  const setCourseTypes = useStore((state) => state.setCourseTypes);
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCourseTypesFields>({
    defaultValues: { name: '' },
  });

  const onSubmit: SubmitHandler<FormCourseTypesFields> = async (data) => {
    servicesAxios.courseTypes
      .addCourseType(data)
      .then((res) => {
        setCourseTypes(res.data);
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
          <Heading level={5}>Course types</Heading>
        </div>
        <div className={styles.component__input}>
          <FormInput
            errors={errors.name}
            label="Course type"
            placeholder="Enter course type"
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
        {courseTypes?.map((courseType: TypeCourseType, index: number) => {
          return (
            <Badge
              key={String(courseType.name + index)}
              color="#00A6FF"
              size="middle"
              text={courseType.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormCourseTypes;
