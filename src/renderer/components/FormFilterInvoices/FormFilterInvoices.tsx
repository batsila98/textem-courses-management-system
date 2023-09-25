import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useOutsideClick } from 'renderer/hooks/useOutsideClick';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectCourse from 'renderer/components/FormSelectCourse/FormSelectCourse';
import FormSelectStudent from 'renderer/components/FormSelectStudent/FormSelectStudent';
import IconFilter from 'renderer/components/svg.library/IconFilter';
import SelectedFilters from 'renderer/components/SelectedFilters/SelectedFilters';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import TypeInvoice from 'renderer/models/Invoice';
import TypeInvoiceType from 'renderer/models/InvoiceType';
import { TypePagination } from 'renderer/components/PaginationBar/PaginationBar';
import styles from './FormFilterInvoices.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  setData: Dispatch<SetStateAction<TypeInvoice[]>>;
  setFiltersQuery: Dispatch<SetStateAction<object>>;
  setPagination: Dispatch<SetStateAction<TypePagination>>;
};

type FormFields = {
  student: string;
  course: string;
  sum_max: number;
  sum_min: number;
  type: string;
};

const FormFilterInvoices = ({
  setData,
  setFiltersQuery,
  setPagination,
}: Props) => {
  const [student, setStudent] = useState<Option>({
    label: '',
    value: '',
  });
  const [course, setCourse] = useState<Option>({
    label: '',
    value: '',
  });
  const invoiceTypes = useStore((state) => state.invoiceTypes);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
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
      student: '',
      course: '',
      type: '',
    },
  });

  const formatFilters = (data: FormFields) => {
    const filters = { ...data };

    if (filters.course !== '') {
      filters.course = course.label;
    }
    if (filters.student !== '') {
      filters.student = student.label;
    }
    if (filters.type !== '') {
      [filters.type] = invoiceTypes
        .filter((type) => {
          return type._id === filters.type;
        })
        .map((type) => {
          return type.name;
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
    servicesAxios.invoices
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
    key: 'student' | 'course' | 'sum_max' | 'sum_min' | 'type'
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
              <FormSelect
                control={control}
                errors={errors.type}
                label="Type"
                name="type"
                options={
                  invoiceTypes &&
                  invoiceTypes.map((invoiceType: TypeInvoiceType) => {
                    return {
                      value: invoiceType._id,
                      label: invoiceType.name,
                    };
                  })
                }
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

export default FormFilterInvoices;
