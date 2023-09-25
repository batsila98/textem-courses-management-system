import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useOutsideClick } from 'renderer/hooks/useOutsideClick';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectStudent from 'renderer/components/FormSelectStudent/FormSelectStudent';
import FormSelectTeacher from 'renderer/components/FormSelectTeacher/FormSelectTeacher';
import IconFilter from 'renderer/components/svg.library/IconFilter';
import SelectedFilters from 'renderer/components/SelectedFilters/SelectedFilters';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import TypeCourse from 'renderer/models/Course';
import TypeCourseStatus from 'renderer/models/CourseStatus';
import TypeCourseTeachingFormat from 'renderer/models/CourseTeachingFormat';
import TypeCourseType from 'renderer/models/CourseType';
import { TypePagination } from 'renderer/components/PaginationBar/PaginationBar';
import styles from './FormFilterCourses.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  setData: Dispatch<SetStateAction<TypeCourse[]>>;
  setFiltersQuery: Dispatch<SetStateAction<object>>;
  setPagination: Dispatch<SetStateAction<TypePagination>>;
};

type FormFields = {
  student: string;
  duration_min: number;
  duration_max: number;
  price_min: number;
  price_max: number;
  status: string;
  teacher: string;
  teaching_format: string;
  type: string;
};

const FormFilterCourses = ({
  setData,
  setFiltersQuery,
  setPagination,
}: Props) => {
  const [student, setStudent] = useState<Option>({
    label: '',
    value: '',
  });
  const [teacher, setTeacher] = useState<Option>({
    label: '',
    value: '',
  });
  const courseStatuses = useStore((state) => state.courseStatuses);
  const courseTeachingFormats = useStore(
    (state) => state.courseTeachingFormats
  );
  const courseTypes = useStore((state) => state.courseTypes);
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
      status: '',
      teacher: '',
      teaching_format: '',
      type: '',
    },
  });

  const formatFilters = (data: FormFields) => {
    const filters = { ...data };

    if (filters.student !== '') {
      filters.student = student.label;
    }
    if (filters.status !== '') {
      [filters.status] = courseStatuses
        .filter((status) => {
          return status._id === filters.status;
        })
        .map((status) => {
          return status.name;
        });
    }
    if (filters.teaching_format !== '') {
      [filters.teaching_format] = courseTeachingFormats
        .filter((teaching_format) => {
          return teaching_format._id === filters.teaching_format;
        })
        .map((teaching_format) => {
          return teaching_format.name;
        });
    }
    if (filters.type !== '') {
      [filters.type] = courseTypes
        .filter((type) => {
          return type._id === filters.type;
        })
        .map((type) => {
          return type.name;
        });
    }
    if (filters.teacher !== '') {
      filters.teacher = teacher.label;
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
    servicesAxios.courses
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
      | 'status'
      | 'teaching_format'
      | 'type'
      | 'student'
      | 'duration_min'
      | 'duration_max'
      | 'price_min'
      | 'price_max'
      | 'teacher'
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
              <FormSelectTeacher
                control={control}
                errors={errors.teacher}
                label="Teacher"
                name="teacher"
                setTeacher={setTeacher}
              />
              <FormSelect
                control={control}
                errors={errors.teaching_format}
                label="Teaching format"
                name="teaching_format"
                options={
                  courseTeachingFormats &&
                  courseTeachingFormats.map(
                    (courseTeachingFormat: TypeCourseTeachingFormat) => {
                      return {
                        value: courseTeachingFormat._id,
                        label: courseTeachingFormat.name,
                      };
                    }
                  )
                }
              />
            </div>
            <div className={styles.form__column}>
              <FormSelect
                control={control}
                errors={errors.type}
                label="Type"
                name="type"
                options={
                  courseTypes &&
                  courseTypes.map((courseType: TypeCourseType) => {
                    return {
                      value: courseType._id,
                      label: courseType.name,
                    };
                  })
                }
              />
              <FormSelect
                control={control}
                errors={errors.status}
                label="Status"
                name="status"
                options={
                  courseStatuses &&
                  courseStatuses.map((courseStatus: TypeCourseStatus) => {
                    return {
                      value: courseStatus._id,
                      label: courseStatus.name,
                    };
                  })
                }
              />
            </div>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.price_min}
                label="Price min"
                placeholder="Enter price min"
                type="number"
                {...register('price_min', {})}
              />
              <FormInput
                errors={errors.price_max}
                label="Price max"
                placeholder="Enter price max"
                type="number"
                {...register('price_max', {})}
              />
            </div>
            <div className={styles.form__column}>
              <FormInput
                errors={errors.duration_min}
                label="Duration min"
                placeholder="Enter duration min"
                type="number"
                {...register('duration_min', {})}
              />
              <FormInput
                errors={errors.duration_max}
                label="Duration max"
                placeholder="Enter duration max"
                type="number"
                {...register('duration_max', {})}
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

export default FormFilterCourses;
