import React, { ForwardedRef, forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './FormInputColor.module.scss';

type Props = {
  errors: FieldError | undefined;
  label: string;
  name: string;
  rest?: object;
};

const FormInputColor = forwardRef(
  (
    { errors, label, name, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [color, setColor] = useState<string>('#000000');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor(event.target.value);
    };

    return (
      <div className={styles.component}>
        <>
          <label htmlFor={name} className={styles.component__label}>
            <span className={styles.component__labelText}>{label}</span>

            <div
              className={styles.component__colorBox}
              style={{ backgroundColor: color }}
            >
              <span className={styles.component__colorBoxText}>{color}</span>
            </div>

            <input
              className={styles.component__input}
              id={name}
              name={name}
              ref={ref}
              onInput={handleChange}
              type="color"
              value={color}
              {...rest}
            />
          </label>
          {errors && (
            <span className={styles.component__error}>{errors.message}</span>
          )}
        </>
      </div>
    );
  }
);

FormInputColor.defaultProps = {
  rest: {},
};

export default FormInputColor;
