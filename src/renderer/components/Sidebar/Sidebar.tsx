import { NavLink } from 'react-router-dom';
import Logo from 'renderer/components/svg.library/Logo';
import Menu from 'renderer/components/Menu/Menu';
import UserMenu from 'renderer/components/UserMenu/UserMenu';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.component}>
      <div className={styles.component__top}>
        <NavLink to="/" className={styles.component__logo}>
          <Logo />
        </NavLink>
        <div className={styles.component__divider} />
      </div>
      <div className={styles.component__menu}>
        <Menu />
      </div>
      <div className={styles.component__bottom}>
        <UserMenu />
      </div>
    </aside>
  );
};

export default Sidebar;
