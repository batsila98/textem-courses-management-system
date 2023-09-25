import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import classNames from 'classnames';
import Button from 'renderer/components/Button/Button';
import ButtonIcon from 'renderer/components/ButtonIcon/ButtonIcon';
import FormDatepicker from 'renderer/components/FormDatepicker/FormDatepicker';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectStudent from 'renderer/components/FormSelectStudent/FormSelectStudent';
import FormTextarea from 'renderer/components/FormTextarea/FormTextarea';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import IconTrash from 'renderer/components/svg.library/IconTrash';
import TypeCourse from 'renderer/models/Course';
import { TypePaymentPlan } from 'renderer/models/Payment';
import TypeStudent from 'renderer/models/Student';
import TypeUser from 'renderer/models/User';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCourseEnrollStudent.module.scss';

type Props = {
  courseID: string;
  enrolledStudents?: string[];
  onSubmitCallback: () => void;
  studentID?: string;
};

type FormFields = {
  access: number;
  billing: string;
  student: string;
  comment: string;
  date_access_end: Date;
  discount?: number;
  payment_plan?: TypePaymentPlan[] | undefined;
  price?: number;
  status: string;
};

const FormCourseEnrollStudent = ({
  courseID,
  enrolledStudents,
  onSubmitCallback,
  studentID,
}: Props) => {
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const user = useMemo<TypeUser>(() => {
    return JSON.parse(window.localStorage.getItem('currentUser') || '');
  }, []);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>();
  const {
    fields: paymentPlanFields,
    append: appendPaymentPlanField,
    remove: removePaymentPlanField,
  } = useFieldArray({
    control,
    name: 'payment_plan',
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (studentID) {
      const enrollmentData = {
        ...data,
        course: courseID,
      };
      servicesAxios.students
        .editStudentsCourseData(studentID, enrollmentData)
        .then((res) => {
          onSubmitCallback();
          setModal({
            icon: <IconSuccess />,
            text: 'Course information successfully updated!',
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
      const enrollmentData = {
        studentID: data.student,
        studentCourse: {
          access: Boolean(data.access),
          comment: data.comment,
          course: courseID,
          date_access_end: data.date_access_end,
          date_enrollment: new Date(),
          status: data.status,
        },
        studentPayment: {
          author: {
            _id: user._id,
            full_name: user.full_name,
          },
          balance: Number(data.price),
          billing: data.billing,
          student: data.student,
          course: courseID,
          discount: Number(data.discount),
          discount_author: {
            _id: user._id,
            full_name: user.full_name,
          },
          payment_plan: data.payment_plan,
          sum: Number(data.price),
        },
      };
      servicesAxios.courses
        .enrollStudentToCourse(courseID, { ...enrollmentData })
        .then((res) => {
          onSubmitCallback();
          setModal({
            icon: <IconSuccess />,
            text: 'Course information successfully updated!',
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
    }
  };

  useEffect(() => {
    if (!studentID) {
      return;
    }
    servicesAxios.students
      .getStudentById({ id: studentID })
      .then((res) => {
        const {
          access,
          comment,
          date_access_end: dateAccessEnd,
          status,
        } = res.data.courses.find((course: { course: TypeCourse }) => {
          return course?.course?._id === courseID;
        });

        setValue('access', Number(access));
        setValue('comment', comment);
        setValue('date_access_end', dateAccessEnd);
        setValue('status', status);
        setValue('student', studentID);

        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  }, [courseID, setModal, setModalVisibility, setValue, studentID]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__body}>
        <Heading level={4}>
          {studentID ? 'Update enrolled student' : 'Enroll student'}
        </Heading>
        <div className={styles.form__fields}>
          <div className={styles.form__row}>
            <FormSelectStudent
              control={control}
              errors={errors.student}
              exclude={
                enrolledStudents && enrolledStudents.length !== 0
                  ? enrolledStudents
                  : null
              }
              isDisabled={Boolean(studentID)}
              label="Student"
              name="student"
            />
          </div>
          <div className={classNames(styles.form__row, styles.form__course)}>
            <div className={styles.form__heading}>
              <Heading level={5}>Course details</Heading>
            </div>
            <div className={styles.form__column}>
              <FormSelect
                control={control}
                errors={errors.access}
                label="Access"
                name="access"
                options={[
                  {
                    label: 'True',
                    value: 1,
                  },
                  {
                    label: 'False',
                    value: 0,
                  },
                ]}
              />
              <FormDatepicker
                control={control}
                errors={errors.date_access_end}
                label="Access end date:"
                name="date_access_end"
                placeholder="Enter date"
              />
              <FormSelect
                control={control}
                errors={errors.status}
                label="Status"
                name="status"
                options={[
                  {
                    label: 'enrolled',
                    value: 'enrolled',
                  },
                  {
                    label: 'active',
                    value: 'active',
                  },
                ]}
              />
            </div>
            <div className={styles.form__column}>
              <FormTextarea
                errors={errors.comment}
                label="Comment:"
                placeholder="Enter comment"
                {...register('comment', { required: 'This field is required' })}
              />
            </div>
          </div>
          {!studentID && (
            <div className={styles.form__row}>
              <div className={styles.form__heading}>
                <Heading level={5}>Payment details</Heading>
              </div>
              <div className={styles.form__column}>
                <FormInput
                  errors={errors.price}
                  label="Price PLN"
                  placeholder="Enter price"
                  type="number"
                  {...register('price', {
                    required: 'This field is required',
                  })}
                />
                <FormInput
                  errors={errors.discount}
                  label="Discount PLN"
                  placeholder="Enter discount"
                  type="number"
                  {...register('discount', {
                    required: 'This field is required',
                  })}
                />
              </div>
              <div className={styles.form__column}>
                <FormTextarea
                  errors={errors.billing}
                  label="Billing information"
                  placeholder="Enter billing information"
                  {...register('billing', {
                    required: 'This field is required',
                  })}
                />
              </div>
              <div
                className={classNames(
                  styles.form__column,
                  styles.form__column_fullWidth,
                  styles.form__paymentPlan
                )}
              >
                {paymentPlanFields.map((item, index) => {
                  return (
                    <div className={styles.form__paymentRow} key={item.id}>
                      <FormInput
                        errors={errors.payment_plan}
                        label="To pay PLN"
                        placeholder="Enter sum to pay"
                        type="number"
                        {...register(`payment_plan.${index}.sum`, {
                          required: 'This field is required',
                        })}
                      />
                      <FormDatepicker
                        control={control}
                        errors={errors.payment_plan}
                        label="Payment deadline:"
                        name={`payment_plan.${index}.date_deadline`}
                        placeholder="Enter date"
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
                      />
                      <FormInput
                        errors={errors.payment_plan}
                        label="Paid amount PLN"
                        placeholder="Enter paid amount"
                        type="number"
                        {...register(`payment_plan.${index}.paid_amount`, {
                          required: 'This field is required',
                        })}
                      />
                      <FormDatepicker
                        control={control}
                        errors={errors.payment_plan}
                        label="Paid date:"
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

                <Button
                  onClick={() =>
                    appendPaymentPlanField({
                      date_deadline: new Date(),
                      paid_amount: 0,
                      payment_number: '',
                      sum: 0,
                      status: 'not paid',
                    })
                  }
                  variant="secondary"
                >
                  Add payment to payment plan
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button submit>{studentID ? 'Edit student' : 'Enroll student'}</Button>
      </div>
    </form>
  );
};

FormCourseEnrollStudent.defaultProps = {
  enrolledStudents: null,
  studentID: undefined,
};

export default FormCourseEnrollStudent;
