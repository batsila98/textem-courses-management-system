import React, { Dispatch, SetStateAction } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import stylesReactSelect from 'renderer/styles/react-select-styles';
import styles from './FormSelect.module.scss';

type Option = {
  value: string | boolean | number;
  label: string;
};

type Props = {
  control: any;
  errors: any;
  label?: string;
  name: string;
  options: Option[];
  required?: string | boolean;
  setData?: Dispatch<SetStateAction<any>>;
  rest?: object;
};

const FormSelect = ({
  control,
  errors,
  label,
  name,
  options,
  required,
  setData,
  ...rest
}: Props) => {
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
        render={({ field: { onChange, value, ref } }) => (
          <Select
            className={styles.component__select}
            inputRef={ref}
            options={options}
            value={
              options?.find((option) => option.value === value) || {
                value: '',
              }
            }
            onChange={(option) => {
              if (setData) {
                setData(option);
              }
              return onChange(option?.value);
            }}
            styles={stylesReactSelect}
          />
        )}
        {...rest}
      />
      {errors && (
        <span className={styles.component__error}>{errors.message}</span>
      )}
    </div>
  );
};

FormSelect.defaultProps = {
  label: '',
  required: false,
  setData: null,
  rest: {},
};

export default FormSelect;
