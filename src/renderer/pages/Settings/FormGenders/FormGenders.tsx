import { useForm, SubmitHandler } from 'react-hook-form';
import Badge from 'renderer/components/Badge/Badge';
import Button from 'renderer/components/Button/Button';
import useStore from 'renderer/store/store';
import FormInput from 'renderer/components/FormInput/FormInput';
import Heading from 'renderer/components/Heading/Heading';
import TypeGender from 'renderer/models/Gender';
import servicesAxios from 'renderer/services/axios';
import styles from './FormGenders.module.scss';

type FormGendersFields = {
  name: string;
};

const FormGenders = () => {
  const genders = useStore((state) => state.genders);
  const setGenders = useStore((state) => state.setGenders);
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormGendersFields>({ defaultValues: { name: '' } });

  const onSubmit: SubmitHandler<FormGendersFields> = async (data) => {
    servicesAxios.genders
      .addGender(data)
      .then((res) => {
        setGenders(res.data);
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
          <Heading level={5}>Genders</Heading>
        </div>
        <div className={styles.component__input}>
          <FormInput
            errors={errors.name}
            label="Gender"
            placeholder="Enter gender"
            type="text"
            {...register('name', { required: 'This field is required' })}
          />
        </div>
        <Button submit>Add</Button>
      </form>
      <div className={styles.component__divider} />
      <div className={styles.component__results}>
        {genders.map((gender: TypeGender, index: number) => {
          return (
            <Badge
              key={String(gender.name + index)}
              color="#00A6FF"
              size="middle"
              text={gender.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormGenders;
