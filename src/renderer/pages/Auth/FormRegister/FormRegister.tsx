import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import Heading from 'renderer/components/Heading/Heading';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormRegister.module.scss';

type Fields = {
  email: string;
  full_name: string;
  password: string;
  username: string;
};

const FormRegister = () => {
  const navigate = useNavigate();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    defaultValues: {
      email: undefined,
      full_name: undefined,
      password: undefined,
      username: undefined,
    },
  });

  const goToLoginPage = () => {
    return navigate('/');
  };

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    servicesAxios.auth
      .register(data)
      .then((res) => {
        setModal({
          buttonText: 'Go to login page',
          buttonAction: goToLoginPage,
          text: 'Registration was successful!',
          title: 'Success',
        });
        setModalVisibility(true);
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
      <Heading level={2}>Register</Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.component__form}
      >
        <FormInput
          errors={errors.full_name}
          label="Full name"
          placeholder="Enter your full name"
          type="text"
          {...register('full_name', { required: 'Full name is required' })}
        />
        <FormInput
          errors={errors.email}
          label="Email"
          placeholder="Enter email"
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        <FormInput
          errors={errors.username}
          label="Username"
          placeholder="Enter username"
          type="text"
          {...register('username', { required: 'Username is required' })}
        />
        <FormInput
          errors={errors.password}
          label="Password"
          placeholder="Enter password"
          type="password"
          {...register('password', { required: 'Password is required!' })}
        />
        <Button submit variant="primary" style={{ width: '100%' }}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default FormRegister;
