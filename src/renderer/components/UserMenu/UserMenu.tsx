import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import TypeUser from 'renderer/models/User';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const navigate = useNavigate();
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);
  const initials = useMemo(() => {
    const fullName: string[] = user.full_name.split(' ');
    return (
      fullName?.shift().charAt(0) + fullName?.pop().charAt(0)
    ).toUpperCase();
  }, [user.full_name]);

  const logout = () => {
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('currentUser');
    navigate('/auth');
  };

  return (
    <div className={styles.component}>
      <div className={styles.component__avatar}>{initials}</div>
      <div className={styles.component__content}>
        <span className={styles.component__name}>{user.full_name}</span>
        <NavLink className={styles.component__link} to={`/users/${user._id}`}>
          Edit
        </NavLink>

        <button
          className={styles.component__link}
          onClick={logout}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
