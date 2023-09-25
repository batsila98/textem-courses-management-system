import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormInvoice from 'renderer/components/FormInvoice/FormInvoice';
import LayoutPageSingle from 'renderer/layouts/LayoutPageSingle/LayoutPageSingle';
import TypeInvoice from 'renderer/models/Invoice';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './SingleInvoice.module.scss';

const SingleInvoice = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const { id } = useParams();
  const [invoice, setInvoice] = useState<TypeInvoice>();

  useEffect(() => {
    if (!id) {
      return;
    }

    servicesAxios.invoices
      .getInvoiceById({ id })
      .then((res) => {
        setInvoice(res.data);
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
      {invoice && <LayoutPageSingle form={<FormInvoice invoice={invoice} />} />}
    </>
  );
};

export default SingleInvoice;
