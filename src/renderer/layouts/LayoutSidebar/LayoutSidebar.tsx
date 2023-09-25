import { Outlet } from 'react-router-dom';
import Sidebar from 'renderer/components/Sidebar/Sidebar';
import styles from './LayoutSidebar.module.scss';

const LayoutSidebar = () => {
  return (
    <div className={styles.component}>
      <div className={styles.component__sidebar}>
        <Sidebar />
      </div>
      <div className={styles.component__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutSidebar;
