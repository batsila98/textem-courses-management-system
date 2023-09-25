import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormUser from 'renderer/pages/SingleUser/FormUser/FormUser';
import LayoutPageSingle from 'renderer/layouts/LayoutPageSingle/LayoutPageSingle';
import TypeUser from 'renderer/models/User';
import styles from './SingleUser.module.scss';

const SingleUser = () => {
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);

  return <LayoutPageSingle form={<FormUser user={user} />} />;
};

export default SingleUser;
