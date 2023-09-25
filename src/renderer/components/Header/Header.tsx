import React from 'react';
import Button from 'renderer/components/Button/Button';
import Heading from 'renderer/components/Heading/Heading';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

type Props = {
  badge?: string;
  navLinkTo?: string;
  title: string;
};

const Header = ({ badge, navLinkTo, title }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.component}>
      <Heading level={4}>
        {title}
        {badge && <span className={styles.component__badge}>{badge}</span>}
      </Heading>

      {navLinkTo && (
        <Button onClick={() => navigate(navLinkTo)} variant="primary">
          Add new
        </Button>
      )}
    </div>
  );
};

Header.defaultProps = {
  badge: '',
  navLinkTo: '',
};

export default Header;
