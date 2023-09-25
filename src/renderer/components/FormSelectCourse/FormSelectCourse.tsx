import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import TypeCourse from 'renderer/models/Course';
import servicesAxios from 'renderer/services/axios';
import stylesReactSelect from 'renderer/styles/react-select-styles';
import styles from './FormSelectCourse.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  control: any;
  errors: any;
  label?: string;
  name: string;
  required?: string | boolean;
  setCourse?: Dispatch<SetStateAction<any>>;
  rest?: object;
};

const FormSelectCourse = ({
  control,
  errors,
  label,
  name,
  required,
  setCourse,
  rest,
}: Props) => {
  const [options, setOptions] = useState<Option[]>();

  const searchCourse = (entered_name: string) => {
    servicesAxios.courses
      .getByName({ name: entered_name })
      .then((res) => {
        setOptions(
          res.data.results?.map((course: TypeCourse) => {
            return { label: course.name, value: course._id };
          })
        );
        return res.data;
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    searchCourse('');
  }, []);

  return (
    <div className={styles.component}>
      {label && (
        <label htmlFor={name} className={styles.component__label}>
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field: { onChange, value, ref } }) => {
          const formattedValue = {
            label: value?.name,
            value: value?._id,
          };
          return (
            <Select
              className={styles.component__select}
              defaultValue={formattedValue}
              inputRef={ref}
              onChange={(option) => {
                if (setCourse) {
                  setCourse(option);
                }
                return onChange(option?.value);
              }}
              onInputChange={(event) => {
                searchCourse(event);
              }}
              options={options}
              styles={stylesReactSelect}
              value={
                options?.find(
                  (option) =>
                    option.value === value || option.value === value?._id
                ) || {
                  value: '',
                }
              }
            />
          );
        }}
        {...rest}
      />
      {errors && (
        <span className={styles.component__error}>{errors.message}</span>
      )}
    </div>
  );
};

FormSelectCourse.defaultProps = {
  label: '',
  required: false,
  setCourse: null,
  rest: {},
};

export default FormSelectCourse;
