import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm, SubmitHandler } from 'react-hook-form';
import Button from 'renderer/components/Button/Button';
import FormCheckbox from 'renderer/components/FormCheckbox/FormCheckbox';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import IconTrash from 'renderer/components/svg.library/IconTrash';
import TypeTeacher from 'renderer/models/Teacher';
import TypeLanguage from 'renderer/models/Language';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormTeacherLanguages.module.scss';

type Props = {
  teacher: TypeTeacher;
};

type FormLanguage = {
  language: string;
  skills: string[];
};

type FormFields = {
  languages: FormLanguage[];
};

const FormTeacherLanguages = ({ teacher }: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const languages = useStore((state) => state.languages);
  const [formattedLanguages] = useState<FormLanguage[]>(
    teacher.languages.map((language) => {
      return {
        language: language.language._id,
        skills: language.skills,
      };
    })
  );
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      languages: formattedLanguages,
    },
  });
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'languages',
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    servicesAxios.teachers
      .updateTeacher(teacher._id, data)
      .then((res) => {
        setModal({
          icon: <IconSuccess />,
          text: 'Teacher information successfully updated!',
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

  useEffect(() => {
    reset({
      languages: formattedLanguages,
    });
  }, [reset, formattedLanguages]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.component}>
      <div className={styles.component__heading}>
        <Heading level={4}>Languages</Heading>
        <div className={styles.component__buttons}>
          <Button
            onClick={() => appendLanguage({ language: '', skills: [] })}
            variant="secondary"
          >
            Add Language
          </Button>
          <Button submit variant="primary">
            Save
          </Button>
        </div>
      </div>
      {languageFields && languageFields.length > 0 && (
        <div className={styles.component__fields}>
          {languageFields.map((field, index) => {
            return (
              <div className={styles.component__formRow} key={field.id}>
                <div className={styles.component__select}>
                  <FormSelect
                    control={control}
                    errors={errors.languages}
                    label="Language:"
                    name={`languages.${index}.language`}
                    options={
                      languages &&
                      languages.map((language: TypeLanguage) => {
                        return {
                          value: language._id,
                          label: language.name,
                        };
                      })
                    }
                  />
                </div>
                <div className={styles.component__checkboxes}>
                  <FormCheckbox
                    label="Read"
                    name={`languages.${index}.skills`}
                    value="read"
                    register={register}
                  />
                  <FormCheckbox
                    label="Speak"
                    name={`languages.${index}.skills`}
                    value="speak"
                    register={register}
                  />
                  <FormCheckbox
                    label="Write"
                    name={`languages.${index}.skills`}
                    value="write"
                    register={register}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className={styles.component__buttonRemove}
                >
                  <IconTrash />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default FormTeacherLanguages;
