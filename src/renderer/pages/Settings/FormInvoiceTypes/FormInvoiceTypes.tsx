import { useForm, SubmitHandler } from 'react-hook-form';
import useStore from 'renderer/store/store';
import Badge from 'renderer/components/Badge/Badge';
import Button from 'renderer/components/Button/Button';
import FormInput from 'renderer/components/FormInput/FormInput';
import Heading from 'renderer/components/Heading/Heading';
import TypeInvoiceType from 'renderer/models/InvoiceType';
import servicesAxios from 'renderer/services/axios';
import styles from './FormInvoiceTypes.module.scss';

type FormInvoiceTypesFields = {
  name: string;
};

const FormInvoiceTypes = () => {
  const invoiceTypes = useStore((state) => state.invoiceTypes);
  const setInvoiceTypes = useStore((state) => state.setInvoiceTypes);
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInvoiceTypesFields>({
    defaultValues: { name: '' },
  });

  const onSubmit: SubmitHandler<FormInvoiceTypesFields> = async (data) => {
    servicesAxios.invoiceTypes
      .addInvoiceType(data)
      .then((res) => {
        setInvoiceTypes(res.data);
        reset();
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  };

  return (
    <div className={styles.component}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.component__form}
      >
        <div className={styles.component__heading}>
          <Heading level={5}>Invoice types</Heading>
        </div>
        <div className={styles.component__input}>
          <FormInput
            errors={errors.name}
            label="Invoice type"
            placeholder="Enter invoice type"
            type="text"
            {...register('name', {
              required: 'This field is required',
            })}
          />
        </div>
        <Button submit>Add</Button>
      </form>
      <div className={styles.component__divider} />
      <div className={styles.component__results}>
        {invoiceTypes?.map((invoiceType: TypeInvoiceType, index: number) => {
          return (
            <Badge
              key={String(invoiceType.name + index)}
              color="#00A6FF"
              size="middle"
              text={invoiceType.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormInvoiceTypes;
