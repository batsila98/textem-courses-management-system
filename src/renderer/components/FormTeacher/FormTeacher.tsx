import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button/Button';
import ButtonIcon from 'renderer/components/ButtonIcon/ButtonIcon';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import IconTrash from 'renderer/components/svg.library/IconTrash';
import PublishingArea from 'renderer/components/PublishingArea/PublishingArea';
import TypeTeacher from 'renderer/models/Teacher';
import TypeGender from 'renderer/models/Gender';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormTeacher.module.scss';

type Props = {
  teacher: TypeTeacher;
};

const FormTeacher = ({ teacher }: Props) => {
  const navigate = useNavigate();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const genders = useStore((state) => state.genders);
  const [teacherData] = useState<object>({
    author: teacher.author,
    full_name: teacher.full_name,
    email: teacher.email,
    gender: teacher.gender,
    phones: teacher.phones,
    social_networks: teacher.social_networks,
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeTeacher>({
    defaultValues: teacherData,
  });
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phones',
  });
  const {
    fields: socialNetworksFields,
    append: appendSocialNetwork,
    remove: removeSocialNetwork,
  } = useFieldArray({
    control,
    name: 'social_networks',
  });

  const onSubmit: SubmitHandler<TypeTeacher> = async (data) => {
    if (teacher._id) {
      servicesAxios.teachers
        .updateTeacher(teacher._id, data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'Teacher information successfully updated!',
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
    } else {
      servicesAxios.teachers
        .createTeacher(data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'The teacher was successfully created!',
            title: 'Success',
          });
          setModalVisibility(true);
          navigate(`/teachers/${res.data._id}`);
          return res.data;
        })
        .catch((err) => {
          setModal({
            text: String(err.response.data.message),
            title: 'Fail',
          });
          setModalVisibility(true);
        });
    }
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
              type="email"
              {...register('email', { required: 'This field is required' })}
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
          <div className={styles.form__column}>
            {phoneFields.map((item, index) => {
              return (
                <div className={styles.form__phone} key={item.id}>
                  <FormInput
                    errors={errors.full_name}
                    label="Phone number:"
                    placeholder="Enter phone number"
                    type="text"
                    {...register(`phones.${index}.number`, {
                      required: 'This field is required',
                    })}
                  />
                  <ButtonIcon
                    color="#FF3D00"
                    icon={<IconTrash fill="#FF3D00" />}
                    onClick={() => removePhone(index)}
                  />
                </div>
              );
            })}
            {phoneFields.length < 3 && (
              <div className={styles.form__addButtonWrapper}>
                {phoneFields.length === 0 && (
                  <div className={styles.form__emptyText}>Phone numbers</div>
                )}
                <Button
                  variant="secondary"
                  onClick={() => appendPhone({ number: '' })}
                >
                  Add phone number
                </Button>
              </div>
            )}
          </div>
          <div className={styles.form__column}>
            {socialNetworksFields.map((item, index) => {
              return (
                <div className={styles.form__socialNetwork} key={item.id}>
                  <FormInput
                    errors={errors.full_name}
                    label="Social network name"
                    placeholder="Enter name"
                    type="text"
                    key={`social_network_name_${item.id}`}
                    {...register(`social_networks.${index}.name`, {
                      required: 'This field is required',
                    })}
                  />
                  <FormInput
                    errors={errors.full_name}
                    label="Social network url"
                    placeholder="Enter url"
                    type="text"
                    key={`social_network_url_${item.id}`}
                    {...register(`social_networks.${index}.url`, {
                      required: 'This field is required',
                    })}
                  />
                  <ButtonIcon
                    color="#FF3D00"
                    icon={<IconTrash fill="#FF3D00" />}
                    onClick={() => removeSocialNetwork(index)}
                  />
                </div>
              );
            })}

            {socialNetworksFields.length < 3 && (
              <div className={styles.form__addButtonWrapper}>
                {socialNetworksFields.length === 0 && (
                  <div className={styles.form__emptyText}>Social networks</div>
                )}
                <Button
                  variant="secondary"
                  onClick={() => appendSocialNetwork({ name: '', url: '' })}
                >
                  Add social network
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <PublishingArea
        content={
          <>
            <div style={{ fontWeight: 500 }}>
              Author:
              <span
                style={{ fontWeight: 400 }}
              >{` ${teacher.author.full_name}`}</span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Creation date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(teacher.date_creation).toLocaleDateString()}`}
              </span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Last modification date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(teacher.date_modification).toLocaleDateString()}`}
              </span>
            </div>
          </>
        }
        submit={<Button submit>{teacher._id ? 'Update' : 'Create'}</Button>}
      />
    </form>
  );
};

export default FormTeacher;
