import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormPayment from 'renderer/components/FormPayment/FormPayment';
import LayoutPageSingle from 'renderer/layouts/LayoutPageSingle/LayoutPageSingle';
import TypePayment from 'renderer/models/Payment';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './SinglePayment.module.scss';

const SinglePayment = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const { id } = useParams();
  const [payment, setPayment] = useState<TypePayment>();

  useEffect(() => {
    if (!id) {
      return;
    }

    servicesAxios.payments
      .getPaymentById({ id })
      .then((res) => {
        setPayment(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  }, [id, setModal, setModalVisibility]);

  return (
    <>
      {payment && <LayoutPageSingle form={<FormPayment payment={payment} />} />}
    </>
  );
};

export default SinglePayment;
