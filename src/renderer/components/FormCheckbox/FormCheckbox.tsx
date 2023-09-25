import React, { ForwardedRef, forwardRef } from 'react';
import styles from './FormCheckbox.module.scss';

type Props = {
  label: string;
  name: string;
  register: any;
  rules?: any;
  value: string | number;
};

const FormCheckbox = forwardRef(
  (
    { label, name, register, rules, value }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.component}>
        <label
          htmlFor={`checkbox-${value}`}
          className={styles.component__label}
        >
          <span className={styles.component__labelText}>{label}</span>
          <input
            className={styles.component__input}
            id={`checkbox-${value}`}
            name={name}
            ref={ref}
            type="checkbox"
            value={value}
            {...(register && register(name, rules))}
          />
        </label>
      </div>
    );
  }
);

FormCheckbox.defaultProps = {
  rules: {},
};

export default FormCheckbox;
