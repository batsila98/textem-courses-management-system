import TypePayment, { TypePaymentPlan } from 'renderer/models/Payment';
import api from './axios';

export interface IPayments {
  createPayment: (params: TypePayment) => Promise<any>;
  filter: (params: {
    balance_max: number;
    balance_min: number;
    debt_max: number;
    debt_min: number;
    discount_max: number;
    discount_min: number;
    sum_max: number;
    sum_min: number;
  }) => Promise<any>;
  getPaymentById: (params: { id: string }) => Promise<any>;
  getPayments: (params?: { limit: number }) => Promise<any>;
  getPaymentsByStudent: (params: { student: string }) => Promise<any>;
  getTotal: () => Promise<any>;
  updatePayment: (id: string, params: TypePayment) => Promise<any>;
  updatePaymentPlan: (
    id: string,
    params: { payment_plan: TypePaymentPlan[] }
  ) => Promise<any>;
}

const services: IPayments = {
  createPayment(params) {
    return api.post('payments', params);
  },
  filter(params) {
    return api.get('payments', { params });
  },
  getPaymentById(params) {
    return api.get(`payments/${params.id}`);
  },
  getPayments(params) {
    return api.get('payments', { params });
  },
  getPaymentsByStudent(params) {
    return api.get('payments/', { params });
  },
  getTotal() {
    return api.get('payments/total');
  },
  updatePayment(id, params) {
    return api.put(`payments/${id}`, params);
  },
  updatePaymentPlan(id, params) {
    return api.put(`payments/${id}`, params);
  },
};

export default services;
