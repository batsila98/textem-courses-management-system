import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from 'renderer/store/store';
import Button from 'renderer/components/Button/Button';
import ButtonIcon from 'renderer/components/ButtonIcon/ButtonIcon';
import FormDatepicker from 'renderer/components/FormDatepicker/FormDatepicker';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectStudent from 'renderer/components/FormSelectStudent/FormSelectStudent';
import FormSelectCourse from 'renderer/components/FormSelectCourse/FormSelectCourse';
import FormTextarea from 'renderer/components/FormTextarea/FormTextarea';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import IconTrash from 'renderer/components/svg.library/IconTrash';
import PublishingArea from 'renderer/components/PublishingArea/PublishingArea';
import TypePayment from 'renderer/models/Payment';
import servicesAxios from 'renderer/services/axios';
import styles from './FormPayment.module.scss';

type Props = {
  payment: TypePayment;
};

const FormPayment = ({ payment }: Props) => {
  const navigate = useNavigate();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const [paymentData] = useState<object>({
    author: payment.author,
    balance: payment.balance,
    billing: payment.billing,
    student: payment.student,
    course: payment.course,
    debt: payment.debt,
    discount: payment.discount,
    mails: payment.mails,
    payment_plan: payment.payment_plan,
    sum: payment.sum,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypePayment>({
    defaultValues: paymentData,
  });

  const {
    fields: paymentPlanFields,
    append: appendPaymentPlanField,
    remove: removePaymentPlanField,
  } = useFieldArray({
    control,
    name: 'payment_plan',
  });

  const {
    fields: mailsFields,
    append: appendMailsField,
    remove: removeMailsField,
  } = useFieldArray({
    control,
    name: 'mails',
  });

  const onSubmit: SubmitHandler<TypePayment> = async (data) => {
    if (payment._id) {
      servicesAxios.payments
        .updatePayment(payment._id, data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'Payment information successfully updated!',
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
      servicesAxios.payments
        .createPayment(data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'The payment was successfully created!',
            title: 'Success',
          });
          setModalVisibility(true);
          navigate(`/payments/${res.data._id}`);
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
      <div className={styles.form__general}>
        <Heading level={4}>General information</Heading>
        <div className={styles.form__generalFields}>
          <div className={styles.form__generalColumn}>
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
            <FormInput
              errors={errors.sum}
              label="Sum PLN"
              placeholder="Enter sum"
              type="number"
              {...register('sum', {
                required: 'This field is required',
              })}
            />
          </div>
          <div className={styles.form__generalColumn}>
            <FormInput
              errors={errors.discount}
              label="Discount PLN"
              placeholder="Enter discount PLN"
              type="number"
              {...register('discount', {
                required: 'This field is required',
              })}
            />
            <FormInput
              errors={errors.balance}
              label="Left To Pay PLN"
              placeholder="Enter left to pay PLN"
              type="number"
              {...register('balance', {
                required: 'This field is required',
              })}
            />
            <FormInput
              errors={errors.debt}
              label="Debt PLN"
              placeholder="Enter debt PLN"
              type="number"
              {...register('debt', {
                required: 'This field is required',
              })}
            />
          </div>
          <div className={styles.form__generalColumn}>
            <FormTextarea
              errors={errors.billing}
              label="Billing data"
              placeholder="Enter billing data"
              {...register('billing', { required: 'This field is required' })}
            />
          </div>
        </div>
      </div>
      <div className={styles.form__mails}>
        <Heading level={4}>Mails</Heading>
        <div className={styles.form__mailsFields}>
          {mailsFields.map((item, index) => {
            return (
              <div className={styles.form__mailsRow} key={item.id}>
                <FormDatepicker
                  control={control}
                  errors={errors.mails}
                  label="Mail date"
                  name={`mails.${index}.date_dispatch`}
                  placeholder="Enter date"
                />
                <ButtonIcon
                  color="#FF3D00"
                  icon={<IconTrash fill="#FF3D00" />}
                  onClick={() => removeMailsField(index)}
                />
              </div>
            );
          })}
        </div>
        {mailsFields.length < 3 && (
          <Button
            variant="secondary"
            onClick={() => appendMailsField({ date_dispatch: new Date() })}
          >
            Add mail
          </Button>
        )}
      </div>
      <div className={styles.form__plan}>
        <Heading level={4}>Payment plan</Heading>
        <div className={styles.form__planFields}>
          {paymentPlanFields.map((item, index) => {
            return (
              <div className={styles.form__planRow} key={item.id}>
                <div className={styles.form__planRowNumber}>{index + 1}</div>
                <FormInput
                  errors={errors.payment_plan}
                  label="To pay"
                  placeholder="Enter sum to pay"
                  type="number"
                  {...register(`payment_plan.${index}.sum`, {
                    required: 'This field is required',
                  })}
                />
                <FormDatepicker
                  control={control}
                  errors={errors.payment_plan}
                  label="Payment deadline"
                  name={`payment_plan.${index}.date_deadline`}
                  placeholder="Enter date"
                  required="This field is required"
                />
                <FormInput
                  errors={errors.payment_plan}
                  label="Payment number"
                  placeholder="Enter payment number"
                  type="text"
                  {...register(`payment_plan.${index}.payment_number`, {
                    required: 'This field is required',
                  })}
                />
                <FormSelect
                  control={control}
                  errors={errors.payment_plan}
                  label="Status"
                  name={`payment_plan.${index}.status`}
                  options={[
                    {
                      label: 'paid',
                      value: 'paid',
                    },
                    {
                      label: 'not paid',
                      value: 'not paid',
                    },
                    {
                      label: 'overdue',
                      value: 'overdue',
                    },
                  ]}
                  required="This field is required"
                />
                <FormInput
                  errors={errors.payment_plan}
                  label="Paid amount"
                  placeholder="Enter paid amount"
                  type="number"
                  {...register(`payment_plan.${index}.paid_amount`, {
                    required: 'This field is required',
                  })}
                />
                <FormDatepicker
                  control={control}
                  errors={errors.payment_plan}
                  label="Paid date"
                  name={`payment_plan.${index}.date_paid`}
                  placeholder="Enter date"
                />
                <ButtonIcon
                  color="#FF3D00"
                  icon={<IconTrash fill="#FF3D00" />}
                  onClick={() => removePaymentPlanField(index)}
                />
              </div>
            );
          })}
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            appendPaymentPlanField({
              date_deadline: new Date(),
              paid_amount: 0,
              payment_number: '',
              sum: 0,
              status: 'not paid',
            })
          }
        >
          Add payment to payment plan
        </Button>
      </div>

      <PublishingArea
        content={
          <>
            <div style={{ fontWeight: 500 }}>
              Author:
              <span
                style={{ fontWeight: 400 }}
              >{` ${payment.author.full_name}`}</span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Creation date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(payment.date_creation).toLocaleDateString()}`}
              </span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Last modification date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(payment.date_modification).toLocaleDateString()}`}
              </span>
            </div>
          </>
        }
        submit={<Button submit>{payment._id ? 'Update' : 'Create'}</Button>}
      />
    </form>
  );
};

export default FormPayment;
