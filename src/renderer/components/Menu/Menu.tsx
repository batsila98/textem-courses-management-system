import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import IconStudents from 'renderer/components/svg.library/IconStudents';
import IconCoinsHand from 'renderer/components/svg.library/IconCoinsHand';
import IconDashboard from 'renderer/components/svg.library/IconDashboard';
import IconEducationHat from 'renderer/components/svg.library/IconEducationHat';
import IconInvoice from 'renderer/components/svg.library/IconInvoice';
import IconSettings from 'renderer/components/svg.library/IconSettings';
import IconStand from 'renderer/components/svg.library/IconStand';
import styles from './Menu.module.scss';

const Menu = () => {
  const location = useLocation();

  return (
    <nav className={styles.component}>
      <NavLink
        to="/"
        className={classNames(
          styles.component__link,
          location.pathname === '/' ? styles.component__link_active : null
        )}
      >
        <div className={styles.component__iconWrapper}>
          <IconDashboard
            fill={location.pathname === '/' ? '#00A6FF' : '#A3AED0'}
          />
        </div>
        Dashboard
      </NavLink>
      <NavLink
        to="/students"
        className={({ isActive }) => {
          return classNames(
            styles.component__link,
            isActive && styles.component__link_active
          );
        }}
      >
        <div className={styles.component__iconWrapper}>
          <IconStudents
            fill={
              location.pathname.includes('students') ? '#00A6FF' : '#A3AED0'
            }
          />
        </div>
        Students
      </NavLink>
      <NavLink
        to="/teachers"
        className={({ isActive }) => {
          return classNames(
            styles.component__link,
            isActive && styles.component__link_active
          );
        }}
      >
        <div className={styles.component__iconWrapper}>
          <IconEducationHat
            fill={
              location.pathname.includes('teachers') ? '#00A6FF' : '#A3AED0'
            }
          />
        </div>
        Teachers
      </NavLink>
      <NavLink
        to="/courses"
        className={({ isActive }) => {
          return classNames(
            styles.component__link,
            isActive && styles.component__link_active
          );
        }}
      >
        <div className={styles.component__iconWrapper}>
          <IconStand
            fill={location.pathname.includes('courses') ? '#00A6FF' : '#A3AED0'}
          />
        </div>
        Courses
      </NavLink>
      <NavLink
        to="/payments"
        className={({ isActive }) => {
          return classNames(
            styles.component__link,
            isActive && styles.component__link_active
          );
        }}
      >
        <div className={styles.component__iconWrapper}>
          <IconCoinsHand
            fill={
              location.pathname.includes('payments') ? '#00A6FF' : '#A3AED0'
            }
          />
        </div>
        Payments
      </NavLink>
      <NavLink
        to="/invoices"
        className={({ isActive }) => {
          return classNames(
            styles.component__link,
            isActive && styles.component__link_active
          );
        }}
      >
        <div className={styles.component__iconWrapper}>
          <IconInvoice
            fill={
              location.pathname.includes('invoices') ? '#00A6FF' : '#A3AED0'
            }
          />
        </div>
        Invoices
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => {
          return classNames(
            styles.component__link,
            isActive && styles.component__link_active
          );
        }}
      >
        <div className={styles.component__iconWrapper}>
          <IconSettings
            fill={
              location.pathname.includes('settings') ? '#00A6FF' : '#A3AED0'
            }
          />
        </div>
        Settings
      </NavLink>
    </nav>
  );
};

export default Menu;
