import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import useStore from 'renderer/store/store';
import stylesReactSelect from 'renderer/styles/react-select-styles';
import styles from './FormSelectCertificate.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  control: any;
  errors: any;
  label?: string;
  name: string;
  setCertificate?: (certificate: string) => any;
  rest?: object;
};

const FormSelectCertificate = ({
  control,
  errors,
  label,
  name,
  setCertificate,
  rest,
}: Props) => {
  const certificates = useStore((state) => state.certificates);
  const options = useMemo(() => {
    return certificates.map((certificate) => ({
      label: certificate.name,
      value: certificate._id,
    }));
  }, [certificates]);

  return (
    <div className={styles.component}>
      {label && (
        <label htmlFor={name} className={styles.component__label}>
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => {
          const formattedValue = {
            label: value?.full_name,
            value: value?._id,
          };

          return (
            <Select
              className={styles.component__select}
              defaultValue={formattedValue}
              inputRef={ref}
              onChange={(option) => {
                if (option?.value && setCertificate) {
                  setCertificate(option?.value);
                }
                return onChange(option?.value);
              }}
              onInputChange={(event) => {
                //   searchTeacher(event);
              }}
              options={options}
              styles={stylesReactSelect}
              value={
                options?.find((option) => option.value === value) || {
                  value: '',
                }
              }
            />
          );
        }}
        {...rest}
      />
      {errors && (
        <span className={styles.component__error}>{errors.message}</span>
      )}
    </div>
  );
};

FormSelectCertificate.defaultProps = {
  label: '',
  setCertificate: () => '',
  rest: {},
};

export default FormSelectCertificate;
