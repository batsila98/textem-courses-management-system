import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import TypeStudent from 'renderer/models/Student';
import servicesAxios from 'renderer/services/axios';
import stylesReactSelect from 'renderer/styles/react-select-styles';
import styles from './FormSelectStudent.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  control: any;
  errors: any;
  exclude?: string[] | null;
  isDisabled?: boolean;
  label?: string;
  name: string;
  required?: string | boolean;
  setStudent?: Dispatch<SetStateAction<any>>;
  rest?: object;
};

const FormSelectStudent = ({
  control,
  errors,
  exclude,
  isDisabled,
  label,
  name,
  required,
  setStudent,
  rest,
}: Props) => {
  const [options, setOptions] = useState<Option[]>();

  const searchStudent = useCallback(
    (entered_name: string) => {
      servicesAxios.students
        .getByName({ full_name: entered_name })
        .then((res) => {
          const students =
            exclude && exclude?.length !== 0
              ? res.data.results.filter((student: TypeStudent) => {
                  return !exclude.includes(student._id);
                })
              : [...res.data.results];

          setOptions(
            students?.map((student: TypeStudent) => {
              return { label: student.full_name, value: student._id };
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
    searchStudent('');
  }, [searchStudent]);

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
            label: value?.full_name,
            value: value?._id,
          };

          return (
            <Select
              className={styles.component__select}
              defaultValue={formattedValue}
              inputRef={ref}
              isDisabled={isDisabled}
              onChange={(option) => {
                if (setStudent) {
                  setStudent(option);
                }
                return onChange(option?.value);
              }}
              onInputChange={(event) => {
                searchStudent(event);
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

FormSelectStudent.defaultProps = {
  exclude: null,
  isDisabled: false,
  label: '',
  required: false,
  setStudent: null,
  rest: {},
};

export default FormSelectStudent;
