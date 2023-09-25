import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useOutsideClick } from 'renderer/hooks/useOutsideClick';
import Button from 'renderer/components/Button/Button';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectCourse from 'renderer/components/FormSelectCourse/FormSelectCourse';
import IconFilter from 'renderer/components/svg.library/IconFilter';
import SelectedFilters from 'renderer/components/SelectedFilters/SelectedFilters';
import useStore from 'renderer/store/store';
import { TypePagination } from 'renderer/components/PaginationBar/PaginationBar';
import TypeGender from 'renderer/models/Gender';
import TypeStudent from 'renderer/models/Student';
import TypeStudentStatus from 'renderer/models/StudentStatus';
import servicesAxios from 'renderer/services/axios';
import styles from './FormFilterStudents.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  setFiltersQuery: Dispatch<SetStateAction<object>>;
  setPagination: Dispatch<SetStateAction<TypePagination>>;
  setStudents: Dispatch<SetStateAction<TypeStudent[]>>;
};

type FormFields = {
  course: string;
  gender: string;
  status: string;
};

const FormFilterStudents = ({
  setFiltersQuery,
  setPagination,
  setStudents,
}: Props) => {
  const genders = useStore((state) => state.genders);
  const studentStatuses = useStore((state) => state.studentStatuses);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<
    { name: string; value: string }[]
  >([]);
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
      gender: '',
      status: '',
    },
  });

  const formatFilters = (data: FormFields) => {
    const filters = { ...data };
    if (filters.course) {
      filters.course = course.label;
    }
    if (filters.gender !== '') {
      [filters.gender] = genders
        .filter((gender) => {
          return gender._id === filters.gender;
        })
        .map((gender) => {
          return gender.name;
        });
    }
    if (filters.status) {
      [filters.status] = studentStatuses
        .filter((status) => {
          return status._id === filters.status;
        })
        .map((status) => {
          return status.name;
        });
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
    servicesAxios.students
      .filter(data)
      .then((res) => {
        setStudents(res.data.results);
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

  const resetSingleFilter = (key: 'course' | 'gender' | 'status') => {
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
                errors={errors.gender}
                label="Gender"
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
            <div className={styles.form__column}>
              <FormSelect
                control={control}
                errors={errors.status}
                label="Status"
                name="status"
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
          </div>
          <Button submit variant="primary">
            Filter
          </Button>
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

export default FormFilterStudents;
