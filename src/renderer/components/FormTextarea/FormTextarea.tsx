import React, { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';
import styles from './FormTextarea.module.scss';

type Props = {
  errors: FieldError | undefined;
  label?: string;
  name: string;
  placeholder: string;
  rest?: object;
};

const FormTextarea = forwardRef(
  (
    { errors, label, name, placeholder, ...rest }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className={styles.component}>
        {label && (
          <label htmlFor={name} className={styles.component__label}>
            {label}
          </label>
        )}
        <textarea
          className={classNames(
            styles.component__textarea,
            errors && styles.component__textarea_error
          )}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {errors && (
          <span className={styles.component__error}>{errors.message}</span>
        )}
      </div>
    );
  }
);

FormTextarea.defaultProps = {
  label: '',
  rest: {},
};

export default FormTextarea;
