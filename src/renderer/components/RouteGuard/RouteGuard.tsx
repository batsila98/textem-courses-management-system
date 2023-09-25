import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './RouteGuard.module.scss';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

type AuthParams = {
  accessToken?: string | null;
  refreshToken?: string | null;
};

const RouteGuard = ({ children }: Props) => {
  const [authParams, setAuthParams] = useState<AuthParams>({
    accessToken: window.localStorage.getItem('accessToken'),
    refreshToken: window.localStorage.getItem('refreshToken'),
  });

  if (!authParams.accessToken && !authParams.refreshToken) {
    return <Navigate to="/auth" />;
  }

  return <div className={styles.component}>{children}</div>;
};

export default RouteGuard;
