import React, { CSSProperties } from 'react';
import classNames from 'classnames';
// styles
import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode | string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  style?: CSSProperties;
  submit?: boolean;
};

const Button = ({
  children,
  disabled,
  onClick,
  variant,
  style,
  submit,
}: ButtonProps) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={submit ? () => {} : onClick}
      className={classNames(styles.component, styles[`component_${variant}`])}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  style: {},
  submit: false,
  variant: 'primary',
};

export default Button;
