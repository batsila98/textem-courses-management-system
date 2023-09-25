import React, { useEffect, useState } from 'react';
import useStore from 'renderer/store/store';
import FormFilterInvoices from 'renderer/components/FormFilterInvoices/FormFilterInvoices';
import Header from 'renderer/components/Header/Header';
import LayoutPageWithList from 'renderer/layouts/LayoutPageWithList/LayoutPageWithList';
import PaginationBar, {
  TypePagination,
} from 'renderer/components/PaginationBar/PaginationBar';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TableInvoices from 'renderer/components/TableInvoices/TableInvoices';
import TypeInvoice from 'renderer/models/Invoice';
import servicesAxios from 'renderer/services/axios';
import styles from './Invoices.module.scss';

const Invoices = () => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [invoices, setInvoices] = useState<TypeInvoice[]>([]);
  const [invoicesTotal, setInvoicesTotal] = useState<number>(0);
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
    servicesAxios.invoices
      .getInvoices()
      .then((res) => {
        setInvoices(res.data.results);
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

    servicesAxios.invoices
      .getTotal()
      .then((res) => {
        setInvoicesTotal(res.data);
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
        invoices && invoices.length ? (
          <TableInvoices invoices={invoices} />
        ) : (
          <Placeholder />
        )
      }
      filtes={
        <FormFilterInvoices
          setData={setInvoices}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
      header={
        <Header
          badge={`${invoicesTotal} entries found`}
          navLinkTo="/invoices/create"
          title="Invoices"
        />
      }
      pagination={
        <PaginationBar
          filtersQuery={filtersQuery}
          pagination={pagination}
          setData={setInvoices}
          setFiltersQuery={setFiltersQuery}
          setPagination={setPagination}
        />
      }
    />
  );
};

export default Invoices;
