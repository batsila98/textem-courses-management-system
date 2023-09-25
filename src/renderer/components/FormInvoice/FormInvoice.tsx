import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from 'renderer/store/store';
import Button from 'renderer/components/Button/Button';
import FormDatepicker from 'renderer/components/FormDatepicker/FormDatepicker';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectStudent from 'renderer/components/FormSelectStudent/FormSelectStudent';
import FormSelectCourse from 'renderer/components/FormSelectCourse/FormSelectCourse';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import PublishingArea from 'renderer/components/PublishingArea/PublishingArea';
import TypeInvoice from 'renderer/models/Invoice';
import TypeInvoiceType from 'renderer/models/InvoiceType';
import servicesAxios from 'renderer/services/axios';
import styles from './FormInvoice.module.scss';

type Props = {
  invoice: TypeInvoice;
};

const FormInvoice = ({ invoice }: Props) => {
  const navigate = useNavigate();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const invoiceTypes = useStore((state) => state.invoiceTypes);
  const [invoiceData] = useState<object>({
    author: invoice.author,
    student: invoice.student,
    course: invoice.course,
    date: invoice.date,
    invoice_number: invoice.invoice_number,
    sum: invoice.sum,
    type: invoice.type?._id,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeInvoice>({
    defaultValues: invoiceData,
  });

  const onSubmit: SubmitHandler<TypeInvoice> = async (data) => {
    if (invoice._id) {
      servicesAxios.invoices
        .updateInvoice(invoice._id, data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'Invoice information successfully updated!',
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
      servicesAxios.invoices
        .createInvoice(data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'The invoice was successfully created!',
            title: 'Success',
          });
          setModalVisibility(true);
          navigate(`/invoices/${res.data._id}`);
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
            <FormSelectStudent
              control={control}
              errors={errors.student}
              label="Student"
              name="student"
              required="This field is required"
            />
            <FormSelectCourse
              control={control}
              errors={errors.student}
              label="Course"
              name="course"
              required="This field is required"
            />
          </div>
          <div className={styles.form__column}>
            <FormInput
              errors={errors.invoice_number}
              label="Invoice number"
              placeholder="Enter invoice number"
              type="text"
              {...register('invoice_number', {
                required: 'This field is required',
              })}
            />
            <FormSelect
              control={control}
              errors={errors.type}
              label="Type:"
              name="type"
              options={
                invoiceTypes &&
                invoiceTypes.map((invoiceType: TypeInvoiceType) => {
                  return {
                    value: invoiceType._id,
                    label: invoiceType.name,
                  };
                })
              }
              required="This field is required"
            />
          </div>
          <div className={styles.form__column}>
            <FormInput
              errors={errors.sum}
              label="Sum PLN"
              placeholder="Enter sum"
              type="text"
              {...register('sum', {
                required: 'This field is required',
              })}
            />
            <FormDatepicker
              control={control}
              errors={errors.date}
              label="Date"
              name="date"
              placeholder="Enter date"
              required="This field is required"
            />
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
              >{` ${invoice.author.full_name}`}</span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Creation date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(invoice.date_creation).toLocaleDateString()}`}
              </span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Last modification date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(invoice.date_modification).toLocaleDateString()}`}
              </span>
            </div>
          </>
        }
        submit={<Button submit>{invoice._id ? 'Update' : 'Create'}</Button>}
      />
    </form>
  );
};

export default FormInvoice;
