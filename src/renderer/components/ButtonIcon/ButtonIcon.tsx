import React from 'react';
import classNames from 'classnames';
import styles from './ButtonIcon.module.scss';

type Props = {
  color?: string;
  disabled?: boolean;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
};

const ButtonIcon = ({ color, disabled, icon, onClick, submit }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={submit ? () => {} : onClick}
      className={classNames(styles.component)}
      disabled={disabled}
      style={{
        borderColor: color,
      }}
    >
      {icon}
    </button>
  );
};

ButtonIcon.defaultProps = {
  color: '#000000',
  disabled: false,
  onClick: () => {},
  submit: false,
};

export default ButtonIcon;
