import React, { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStore from 'renderer/store/store';
import FormInput from 'renderer/components/FormInput/FormInput';
import IconSearch from 'renderer/components/svg.library/IconSearch';
import TypeStudent from 'renderer/models/Student';
import TypeCourse from 'renderer/models/Course';
import TypeTeacher from 'renderer/models/Teacher';
import servicesAxios from 'renderer/services/axios';
import styles from './FormSearch.module.scss';

type Props = {
  setResultData:
    | Dispatch<SetStateAction<TypeStudent[]>>
    | Dispatch<SetStateAction<TypeTeacher[]>>
    | Dispatch<SetStateAction<TypeCourse[]>>;
};

type FormFields = {
  search: string;
};

const FormSearch = ({ setResultData }: Props) => {
  const location = useLocation();
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const {
    register,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const onSearchChange = (event: React.FormEvent<HTMLInputElement>): void => {
    if (location.pathname === '/students') {
      servicesAxios.students
        .getByName({ full_name: event.currentTarget.value })
        .then((res) => {
          setResultData(res.data.results);
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
    if (location.pathname === '/teachers') {
      servicesAxios.teachers
        .getByName({ full_name: event.currentTarget.value })
        .then((res) => {
          setResultData(res.data.results);
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
    if (location.pathname === '/courses') {
      servicesAxios.courses
        .getByName({ name: event.currentTarget.value })
        .then((res) => {
          setResultData(res.data.results);
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
    <form onSubmit={onSubmit} className={styles.component}>
      <FormInput
        errors={errors.search}
        placeholder="Search"
        type="text"
        {...register('search', {
          onChange: onSearchChange,
          required: 'This field is required',
        })}
      />
      <div className={styles.component__icon}>
        <IconSearch fill="#666687" />
      </div>
    </form>
  );
};

export default FormSearch;
