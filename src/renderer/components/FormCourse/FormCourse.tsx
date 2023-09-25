import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button/Button';
import FormDatepicker from 'renderer/components/FormDatepicker/FormDatepicker';
import FormInput from 'renderer/components/FormInput/FormInput';
import FormSelect from 'renderer/components/FormSelect/FormSelect';
import FormSelectCourse from 'renderer/components/FormSelectCourse/FormSelectCourse';
import Heading from 'renderer/components/Heading/Heading';
import IconSuccess from 'renderer/components/svg.library/IconSuccess';
import PublishingArea from 'renderer/components/PublishingArea/PublishingArea';
import TypeCourse from 'renderer/models/Course';
import TypeCourseStatus from 'renderer/models/CourseStatus';
import TypeCourseTeachingFormat from 'renderer/models/CourseTeachingFormat';
import TypeCourseType from 'renderer/models/CourseType';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './FormCourse.module.scss';

type Props = {
  course: TypeCourse;
};

const FormCourse = ({ course }: Props) => {
  const navigate = useNavigate();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const courseStatuses = useStore((state) => state.courseStatuses);
  const courseTeachingFormats = useStore(
    (state) => state.courseTeachingFormats
  );
  const courseTypes = useStore((state) => state.courseTypes);
  const [courseData] = useState<object>({
    author: course.author,
    code: course.code,
    date_end: course.date_end,
    date_start: course.date_start,
    duration: course.duration,
    edition_id: course.edition_id,
    name: course.name,
    parent_course: course.parent_course,
    price_basic: course.price_basic,
    status: course.status?._id,
    teaching_format: course.teaching_format?._id,
    type: course.type?._id,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeCourse>({
    defaultValues: courseData,
  });

  const onSubmit: SubmitHandler<TypeCourse> = async (data) => {
    if (course._id) {
      servicesAxios.courses
        .updateCourse(course._id, data)
        .then((res) => {
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
      servicesAxios.courses
        .createCourse(data)
        .then((res) => {
          setModal({
            icon: <IconSuccess />,
            text: 'The course was successfully created!',
            title: 'Success',
          });
          setModalVisibility(true);
          navigate(`/courses/${res.data._id}`);
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
          <FormInput
            errors={errors.name}
            label="Name"
            placeholder="Enter name"
            type="text"
            {...register('name', { required: 'This field is required' })}
          />
          <div className={styles.form__column}>
            <FormInput
              errors={errors.code}
              label="Code"
              placeholder="Enter code"
              type="text"
              {...register('code', { required: 'This field is required' })}
            />
            <FormInput
              errors={errors.edition_id}
              label="Edition id"
              placeholder="Enter edition id"
              type="text"
              {...register('edition_id', {
                required: 'This field is required',
              })}
            />
            <FormSelectCourse
              control={control}
              errors={errors.parent_course}
              label="Parent course"
              name="parent_course"
            />
          </div>
          <div className={styles.form__column}>
            <div className={styles.form__row}>
              <FormDatepicker
                control={control}
                errors={errors.date_start}
                label="Start date:"
                name="date_start"
                placeholder="Enter start date"
                required="This field is required"
              />
              <FormDatepicker
                control={control}
                errors={errors.date_end}
                label="End date:"
                name="date_end"
                placeholder="Enter end date"
                required="This field is required"
              />
            </div>
            <FormInput
              errors={errors.duration}
              label="Duration in hours"
              placeholder="Enter duration in hours"
              type="number"
              {...register('duration', {
                required: 'This field is required',
              })}
            />
            <FormInput
              errors={errors.price_basic}
              label="Basic price in PLN"
              placeholder="Enter basic price in PLN"
              type="number"
              {...register('price_basic', {
                required: 'This field is required',
              })}
            />
          </div>
          <div className={styles.form__column}>
            <FormSelect
              control={control}
              errors={errors.teaching_format}
              label="Teaching format"
              name="teaching_format"
              options={
                courseTeachingFormats &&
                courseTeachingFormats.map(
                  (teachingFormat: TypeCourseTeachingFormat) => {
                    return {
                      value: teachingFormat._id,
                      label: teachingFormat.name,
                    };
                  }
                )
              }
              required="This field is required"
            />
            <FormSelect
              control={control}
              errors={errors.type}
              label="Type"
              name="type"
              options={
                courseTypes &&
                courseTypes.map((courseType: TypeCourseType) => {
                  return {
                    value: courseType._id,
                    label: courseType.name,
                  };
                })
              }
              required="This field is required"
            />
            <FormSelect
              control={control}
              errors={errors.status}
              label="Status"
              name="status"
              options={
                courseStatuses &&
                courseStatuses.map((courseStatus: TypeCourseStatus) => {
                  return {
                    value: courseStatus._id,
                    label: courseStatus.name,
                  };
                })
              }
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
              >{` ${course.author.full_name}`}</span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Creation date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(course.date_creation).toLocaleDateString()}`}
              </span>
            </div>
            <div style={{ fontWeight: 500 }}>
              Last modification date:
              <span style={{ fontWeight: 400 }}>
                {` ${new Date(course.date_modification).toLocaleDateString()}`}
              </span>
            </div>
          </>
        }
        submit={<Button submit>{course._id ? 'Update' : 'Create'}</Button>}
      />
    </form>
  );
};

export default FormCourse;
