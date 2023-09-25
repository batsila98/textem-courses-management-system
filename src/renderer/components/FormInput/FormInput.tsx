import React, { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';
import styles from './FormInput.module.scss';

type Props = {
  errors: FieldError | any;
  label?: string;
  name: string;
  placeholder: string;
  rest?: object;
  type: string;
};

const FormInput = forwardRef(
  (
    { errors, label, name, placeholder, type, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.component}>
        {label && (
          <label htmlFor={name} className={styles.component__label}>
            {label}
          </label>
        )}
        <input
          className={classNames(
            styles.component__input,
            errors && styles.component__input_error
          )}
          name={name}
          placeholder={placeholder}
          ref={ref}
          type={type}
          {...rest}
        />
        {errors && (
          <span className={styles.component__error}>{errors.message}</span>
        )}
      </div>
    );
  }
);

FormInput.defaultProps = {
  label: '',
  rest: {},
};

export default FormInput;
