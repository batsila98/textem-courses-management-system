export type TypePaymentPlan = {
  date_deadline: Date;
  date_paid?: Date;
  paid_amount: number;
  payment_number: string;
  status: string;
  sum: number;
};

type Payment = {
  _id: string;
  author: {
    _id: string;
    full_name: string;
  };
  balance: number;
  billing: string;
  student: {
    _id: string;
    full_name: string;
  };
  course: {
    _id: string;
    name: string;
  };
  debt: number;
  discount: number;
  mails?:
    | [
        {
          date_dispatch: Date;
        }
      ]
    | [];
  payment_plan?: TypePaymentPlan[];
  sum: number;
  date_creation: Date | number;
  date_modification: Date | number;
};

export default Payment;
