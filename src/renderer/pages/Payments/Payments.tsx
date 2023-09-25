import React, { useEffect, useState } from 'react';
import useStore from 'renderer/store/store';
import FormFilterPayments from 'renderer/components/FormFilterPayments/FormFilterPayments';
import Header from 'renderer/components/Header/Header';
import LayoutPageWithList from 'renderer/layouts/LayoutPageWithList/LayoutPageWithList';
import PaginationBar, {
  TypePagination,
} from 'renderer/components/PaginationBar/PaginationBar';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TablePayments from 'renderer/components/TablePayments/TablePayments';
import TypePayment from 'renderer/models/Payment';
import servicesAxios from 'renderer/services/axios';
import styles from './Payments.module.scss';

const Payments = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [payments, setPayments] = useState<TypePayment[]>([]);
  const [paymentsTotal, setPaymentsTotal] = useState<number>(0);
  const [filtersQuery, setFiltersQuery] = useState<object>({});
  const [pagination, setPagination] = useState<TypePagination>({
    next: {
      page: 0,
    },
    previous: {
      page: 0,
    },
  });

  useEffect(() => {
    servicesAxios.payments
      .getPayments()
      .then((res) => {
        setPayments(res.data.results);
        setPagination(res.data.pagination);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.payments
      .getTotal()
      .then((res) => {
        setPaymentsTotal(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  }, [setModal, setModalVisibility]);

  return (
    <LayoutPageWithList
      content={
        payments && payments.length ? (
          <TablePayments payments={payments} />
        ) : (
          <Placeholder />
        )
      }
      filtes={
        <FormFilterPayments
          setData={setPayments}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
      header={
        <Header
          badge={`${paymentsTotal} entries found`}
          navLinkTo="/payments/create"
          title="Payments"
        />
      }
      pagination={
        <PaginationBar
          filtersQuery={filtersQuery}
          pagination={pagination}
          setData={setPayments}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
    />
  );
};

export default Payments;
