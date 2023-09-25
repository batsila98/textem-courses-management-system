import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useOutsideClick } from 'renderer/hooks/useOutsideClick';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelectCourse from 'renderer/components/FormSelectCourse/FormSelectCourse';
import FormSelectStudent from 'renderer/components/FormSelectStudent/FormSelectStudent';
import IconFilter from 'renderer/components/svg.library/IconFilter';
import SelectedFilters from 'renderer/components/SelectedFilters/SelectedFilters';
import servicesAxios from 'renderer/services/axios';
import { TypePagination } from 'renderer/components/PaginationBar/PaginationBar';
import TypePayment from 'renderer/models/Payment';
import styles from './FormFilterPayments.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  setData: Dispatch<SetStateAction<TypePayment[]>>;
  setFiltersQuery: Dispatch<SetStateAction<object>>;
  setPagination: Dispatch<SetStateAction<TypePagination>>;
};

type FormFields = {
  balance_max: number;
  balance_min: number;
  course: string;
  debt_max: number;
  debt_min: number;
  discount_max: number;
  discount_min: number;
  student: string;
  sum_max: number;
  sum_min: number;
};

const FormFilterPayments = ({
  setData,
  setFiltersQuery,
  setPagination,
}: Props) => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [student, setStudent] = useState<Option>({
    label: '',
    value: '',
  });
  const [course, setCourse] = useState<Option>({
    label: '',
    value: '',
  });
  const [selectedFilters, setSelectedFilters] = useState<
    { name: string; value: string | number }[]
  >([]);
  const componentRef = useOutsideClick(() => {
    if (isFilterVisible) {
      setIsFilterVisible(false);
    }
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormFields>({
    defaultValues: {
      course: '',
      student: '',
    },
  });

  const formatFilters = (data: FormFields) => {
    const filters = { ...data };

    if (filters.student !== '') {
      filters.student = student.label;
    }
    if (filters.course !== '') {
      filters.course = course.label;
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
    servicesAxios.payments
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

  const resetSingleFilter = async (
    key:
      | 'balance_max'
      | 'balance_min'
      | 'course'
      | 'debt_max'
      | 'debt_min'
      | 'discount_max'
      | 'discount_min'
      | 'student'
      | 'sum_max'
      | 'sum_min'
  ) => {
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
              <FormSelectStudent
                control={control}
                errors={errors.student}
                label="Student"
                name="student"
                setStudent={setStudent}
              />
              <FormSelectCourse
                control={control}
                errors={errors.course}
                label="Course"
                name="course"
                setCourse={setCourse}
              />
            </div>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.sum_min}
                label="Sum min"
                placeholder="Enter sum min"
                type="number"
                {...register('sum_min', {})}
              />
              <FormInput
                errors={errors.sum_max}
                label="Sum max"
                placeholder="Enter sum max"
                type="number"
                {...register('sum_max', {})}
              />
            </div>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.balance_min}
                label="Left to pay min"
                placeholder="Enter value"
                type="number"
                {...register('balance_min', {})}
              />
              <FormInput
                errors={errors.balance_max}
                label="Left to pay max"
                placeholder="Enter value"
                type="number"
                {...register('balance_max', {})}
              />
            </div>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.debt_min}
                label="Debt min"
                placeholder="Enter debt min"
                type="number"
                {...register('debt_min', {})}
              />
              <FormInput
                errors={errors.debt_max}
                label="Debt max"
                placeholder="Enter debt mex"
                type="number"
                {...register('debt_max', {})}
              />
            </div>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.discount_min}
                label="Discount min"
                placeholder="Enter discount min"
                type="number"
                {...register('discount_min', {})}
              />
              <FormInput
                errors={errors.discount_max}
                label="Discount max"
                placeholder="Enter discount mex"
                type="number"
                {...register('discount_max', {})}
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

export default FormFilterPayments;
