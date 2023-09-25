import React from 'react';
import Heading from 'renderer/components/Heading/Heading';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormLogin.module.scss';

type Fields = {
  username: string;
  password: string;
};

const FormLogin = () => {
  const navigate = useNavigate();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      username: undefined,
      password: undefined,
    },
  });

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    servicesAxios.auth
      .logIn(data)
      .then((res) => {
        window.localStorage.setItem('accessToken', res.data.accessToken);
        window.localStorage.setItem('refreshToken', res.data.refreshToken);
        window.localStorage.setItem(
          'currentUser',
          JSON.stringify(res.data.user)
        );
        navigate('/');
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  };

  return (
    <div className={styles.component}>
      <Heading level={2}>Login</Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.component__form}
      >
        <FormInput
          errors={errors.username}
          label="Username"
          placeholder="Enter username"
          type="text"
          {...register('username', { required: 'This field is required' })}
        />
        <FormInput
          errors={errors.password}
          label="Password"
          placeholder="Enter password"
          type="password"
          {...register('password', { required: 'This field is required!' })}
        />
        <Button submit variant="primary" style={{ width: '100%' }}>
          Log in
        </Button>
      </form>
    </div>
  );
};

export default FormLogin;
