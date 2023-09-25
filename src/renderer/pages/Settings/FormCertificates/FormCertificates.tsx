import React, { useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Badge from 'renderer/components/Badge/Badge';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import Heading from 'renderer/components/Heading/Heading';
import TypeCertificate from 'renderer/models/Certificate';
import TypeUser from 'renderer/models/User';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCertificates.module.scss';

const FormCertificates = () => {
  const certificates = useStore((state) => state.certificates);
  const setCertificates = useStore((state) => state.setCertificates);
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeCertificate>({ defaultValues: { name: '' } });

  const onSubmit: SubmitHandler<TypeCertificate> = async (data) => {
    data.author = {
      _id: user._id,
      full_name: user.full_name,
    };

    servicesAxios.certificates
      .createCertificate(data)
      .then((res) => {
        setCertificates(res.data);
        reset();
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.component__form}
      >
        <div className={styles.component__heading}>
          <Heading level={5}>Certificates</Heading>
        </div>
        <div className={styles.component__input}>
          <FormInput
            errors={errors.name}
            label="Certificate"
            placeholder="Enter certificate name"
            type="text"
            {...register('name', { required: 'This field is required' })}
          />
        </div>
        <Button submit>Add</Button>
      </form>
      <div className={styles.component__divider} />
      <div className={styles.component__results}>
        {certificates?.map((certificate: TypeCertificate, index: number) => {
          return (
            <Badge
              key={String(certificate.name + index)}
              color="#00A6FF"
              size="middle"
              text={certificate.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormCertificates;
