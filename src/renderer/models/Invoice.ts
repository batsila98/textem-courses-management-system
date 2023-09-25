import TypeInvoiceType from './InvoiceType';

type Invoice = {
  _id: string;
  author: {
    _id: string;
    full_name: string;
  };
  student: {
    _id: string;
    full_name: string;
  };
  course: {
    _id: string;
    name: string;
  };
  date: Date | number;
  invoice_number: string;
  sum: number;
  type: TypeInvoiceType;
  date_creation: Date | number;
  date_modification: Date | number;
};

export default Invoice;
