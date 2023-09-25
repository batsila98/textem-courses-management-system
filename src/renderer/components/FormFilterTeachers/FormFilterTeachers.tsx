import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import Button from 'renderer/components/Button/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useOutsideClick } from 'renderer/hooks/useOutsideClick';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectCourse from 'renderer/components/FormSelectCourse/FormSelectCourse';
import IconFilter from 'renderer/components/svg.library/IconFilter';
import SelectedFilters from 'renderer/components/SelectedFilters/SelectedFilters';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import { TypePagination } from 'renderer/components/PaginationBar/PaginationBar';
import TypeLanguage from 'renderer/models/Language';
import TypeTeacher from 'renderer/models/Teacher';
import styles from './FormFilterTeachers.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  setData: Dispatch<SetStateAction<TypeTeacher[]>>;
  setFiltersQuery: Dispatch<SetStateAction<object>>;
  setPagination: Dispatch<SetStateAction<TypePagination>>;
};

type FormFields = {
  course: string;
  language: string;
};

const FormFilterTeachers = ({
  setData,
  setFiltersQuery,
  setPagination,
}: Props) => {
  const languages = useStore((state) => state.languages);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<
    { name: string; value: string }[]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Option>({
    label: '',
    value: '',
  });
  const [course, setCourse] = useState<Option>({
    label: '',
    value: '',
  });
  const componentRef = useOutsideClick(() => {
    if (isFilterVisible) {
      setIsFilterVisible(false);
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormFields>({
    defaultValues: {
      course: '',
      language: '',
    },
  });

  const formatFilters = (data: FormFields) => {
    const filters = { ...data };
    if (filters.course !== '') {
      filters.course = course.label;
    }
    if (filters.language !== '') {
      filters.language = selectedLanguage.label;
    }
    setSelectedFilters(
      Object.entries(filters)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => {
          return {
            name: key,
            value,
          };
        })
    );
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    servicesAxios.teachers
      .filter(data)
      .then((res) => {
        setData(res.data.results);
        setFiltersQuery(data);
        setPagination(res.data.pagination);
        formatFilters(data);
        setIsFilterVisible((current) => current && !current);
        return res.data;
      })
      .catch((err) => {
        alert(err);
      });
  };

  const resetAllFilters = () => {
    reset();
    handleSubmit(onSubmit)();
  };

  const resetSingleFilter = (key: 'course' | 'language') => {
    setValue(key, '');
    handleSubmit(onSubmit)();
  };

  return (
    <div className={styles.component} ref={componentRef}>
      <Button
        variant="secondary"
        onClick={() => setIsFilterVisible((prevState) => !prevState)}
      >
        <div className={styles.component__buttonIcon}>
          <IconFilter fill="#00A6FF" />
        </div>
        Filter
      </Button>
      <form
        className={classNames(
          styles.form,
          !isFilterVisible && styles.form_hidden
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.form__body}>
          <div className={styles.form__fields}>
            <div className={styles.form__column}>
              <FormSelectCourse
                control={control}
                errors={errors.course}
                label="Course"
                name="course"
                setCourse={setCourse}
              />
            </div>
            <div className={styles.form__column}>
              <FormSelect
                control={control}
                errors={errors.language}
                label="Language"
                name="language"
                options={
                  languages &&
                  languages.map((language: TypeLanguage) => {
                    return {
                      value: language._id,
                      label: language.name,
                    };
                  })
                }
                setData={setSelectedLanguage}
              />
            </div>
          </div>
          <Button submit>Filter</Button>
        </div>
      </form>
      {selectedFilters && selectedFilters.length !== 0 && (
        <SelectedFilters
          filters={selectedFilters}
          resetAllFilters={resetAllFilters}
          resetSingleFilter={resetSingleFilter}
        />
      )}
    </div>
  );
};

export default FormFilterTeachers;
