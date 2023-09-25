import { useForm, SubmitHandler } from 'react-hook-form';
import Badge from 'renderer/components/Badge/Badge';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import Heading from 'renderer/components/Heading/Heading';
import TypeLanguage from 'renderer/models/Language';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormLanguages.module.scss';

type FormLanguagesFields = {
  name: string;
};

const FormLanguages = () => {
  const languages = useStore((state) => state.languages);
  const setLanguages = useStore((state) => state.setLanguages);
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLanguagesFields>({ defaultValues: { name: '' } });

  const onSubmit: SubmitHandler<FormLanguagesFields> = async (data) => {
    servicesAxios.languages
      .addLanguage(data)
      .then((res) => {
        setLanguages(res.data);
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
          <Heading level={5}>Languages</Heading>
        </div>

        <div className={styles.component__input}>
          <FormInput
            errors={errors.name}
            label="Language"
            placeholder="Enter language"
            type="text"
            {...register('name', { required: 'This field is required' })}
          />
        </div>
        <Button submit>Add</Button>
      </form>
      <div className={styles.component__divider} />
      <div className={styles.component__results}>
        {languages?.map((language: TypeLanguage, index: number) => {
          return (
            <Badge
              key={String(language.name + index)}
              color="#00A6FF"
              size="middle"
              text={language.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormLanguages;
