import React, { useState } from 'react';
import Button from 'renderer/components/Button/Button';
import Logo from 'renderer/components/svg.library/Logo';
import FormLogin from './FormLogin/FormLogin';
import FormRegister from './FormRegister/FormRegister';
import styles from './Auth.module.scss';

const Auth = () => {
  const [islogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className={styles.component}>
      <div className={styles.component__left}>
        <div className={styles.component__logo}>
          <Logo />
        </div>
        <div className={styles.component__formWrapper}>
          <div className={styles.component__form}>
            {islogin ? <FormLogin /> : <FormRegister />}
          </div>
          <div className={styles.component__switcher}>
            {islogin ? "Don't have an account?" : 'Already have an account?.'}
            <button
              className={styles.component__button}
              type="button"
              onClick={() => {
                setIsLogin((current) => !current);
              }}
            >
              {islogin ? 'Sign up.' : 'Log in.'}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.component__right} />
    </div>
  );
};

export default Auth;
