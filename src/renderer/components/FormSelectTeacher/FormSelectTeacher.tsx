import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import TypeTeacher from 'renderer/models/Teacher';
import servicesAxios from 'renderer/services/axios';
import stylesReactSelect from 'renderer/styles/react-select-styles';
import styles from './FormSelectTeacher.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  control: any;
  errors: any;
  exclude?: string[] | null;
  label?: string;
  name: string;
  setTeacher?: Dispatch<SetStateAction<any>>;
  rest?: object;
};

const FormSelectTeacher = ({
  control,
  errors,
  exclude,
  label,
  name,
  setTeacher,
  rest,
}: Props) => {
  const [options, setOptions] = useState<Option[]>();

  const searchTeacher = useCallback(
    (entered_name: string) => {
      servicesAxios.teachers
        .getByName({ full_name: entered_name })
        .then((res) => {
          const teachers =
            exclude && exclude?.length !== 0
              ? res.data.results.filter((teacher: TypeTeacher) => {
                  return !exclude.includes(teacher._id);
                })
              : [...res.data.results];

          setOptions(
            teachers?.map((teacher: TypeTeacher) => {
              return { label: teacher.full_name, value: teacher._id };
            })
          );
          return res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    [exclude]
  );

  useEffect(() => {
    searchTeacher('');
  }, [searchTeacher]);

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
        render={({ field: { onChange, value, ref } }) => {
          const formattedValue = {
            label: value?.full_name,
            value: value?._id,
          };
          return (
            <Select
              className={styles.component__select}
              defaultValue={formattedValue}
              inputRef={ref}
              onChange={(option) => {
                if (setTeacher) {
                  setTeacher(option);
                }
                return onChange(option?.value);
              }}
              onInputChange={(event) => {
                searchTeacher(event);
              }}
              options={options}
              styles={stylesReactSelect}
              value={
                options?.find((option) => option.value === value) || {
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

FormSelectTeacher.defaultProps = {
  exclude: null,
  label: '',
  setTeacher: null,
  rest: {},
};

export default FormSelectTeacher;
