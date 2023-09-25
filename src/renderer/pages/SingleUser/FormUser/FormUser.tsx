import { useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import PublishingArea from 'renderer/components/PublishingArea/PublishingArea';
import TypeGender from 'renderer/models/Gender';
import TypeUser from 'renderer/models/User';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormUser.module.scss';

type Props = {
  user: TypeUser;
};

const FormUser = ({ user }: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const genders = useStore((state) => state.genders);
  const userData = useMemo(() => {
    return {
      full_name: user.full_name,
      email: user.email,
      gender: user.gender,
      username: user.username,
    };
  }, [user.email, user.full_name, user.gender, user.username]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeUser>({
    defaultValues: userData,
  });

  const onSubmit: SubmitHandler<TypeUser> = async (data) => {
    servicesAxios.users
      .updateUser(user._id, data)
      .then((res) => {
        setModal({
          icon: <IconSuccess />,
          text: 'User information successfully updated!',
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
    window.localStorage.setItem(
      'currentUser',
      JSON.stringify({
        _id: user._id,
        date_creation: user.date_creation,
        date_modification: user.date_modification,
        email: data.email,
        full_name: data.full_name,
        gender: data.gender,
        password: user.password,
        username: data.username,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__body}>
        <Heading level={4}>General information</Heading>

        <div className={styles.form__fields}>
          <div className={styles.form__column}>
            <FormInput
              errors={errors.full_name}
              label="Full name"
              placeholder="Enter full name"
              type="text"
              {...register('full_name', { required: 'This field is required' })}
            />
            <FormInput
              errors={errors.email}
              label="Email"
              placeholder="Enter email"
              type="text"
              {...register('email', { required: 'This field is required' })}
            />
          </div>
          <div className={styles.form__column}>
            <FormInput
              errors={errors.username}
              label="Username"
              placeholder="Enter username"
              type="text"
              {...register('username', { required: 'This field is required' })}
            />
            <FormSelect
              control={control}
              errors={errors.gender}
              label="Gender:"
              name="gender"
              options={
                genders &&
                genders.map((gender: TypeGender) => {
                  return {
                    value: gender._id,
                    label: gender.name,
                  };
                })
              }
            />
          </div>
        </div>
      </div>

      <PublishingArea
        content={
          <>
            <div>
              Creation date:
              <span>
                {` ${new Date(user.date_creation).toLocaleDateString()}`}
              </span>
            </div>
            <div>
              Last modification date:
              <span>
                {` ${new Date(user.date_modification).toLocaleDateString()}`}
              </span>
            </div>
          </>
        }
        submit={<Button submit>Update</Button>}
      />
    </form>
  );
};

export default FormUser;
