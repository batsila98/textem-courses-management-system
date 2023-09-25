import React from 'react';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import styles from './FormDatepicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  control: any;
  errors: any;
  label?: string;
  name: string;
  placeholder: string;
  required?: string | boolean;
};

const FormDatepicker = ({
  control,
  errors,
  label,
  name,
  placeholder,
  required,
}: Props) => {
  return (
    <div className={styles.component}>
      {label && (
        <label htmlFor={name} className={styles.component__label}>
          {label}
        </label>
      )}
      <div className={styles.component__datepickerWrapper}>
        <Controller
          control={control}
          name={name}
          rules={{ required }}
          render={({ field: { onChange, onBlur, value, ref } }) => {
            const formattedValue = value ? new Date(value) : null;
            return (
              <ReactDatePicker
                className={styles.component__datepicker}
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                placeholderText={placeholder}
                selected={formattedValue}
              />
            );
          }}
        />
      </div>
      {errors && (
        <span className={styles.component__error}>{errors.message}</span>
      )}
    </div>
  );
};

FormDatepicker.defaultProps = {
  label: '',
  required: false,
};

export default FormDatepicker;
