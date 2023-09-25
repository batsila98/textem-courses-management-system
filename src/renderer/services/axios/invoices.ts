import TypeInvoice from 'renderer/models/Invoice';
import api from './axios';

export interface IInvoices {
  createInvoice: (params: TypeInvoice) => Promise<any>;
  filter: (params: {
    sum_max: number;
    sum_min: number;
    type: string;
  }) => Promise<any>;
  getInvoiceById: (params: { id: string }) => Promise<any>;
  getInvoices: () => Promise<any>;
  getInvoicesByStudent: (params: { student: string }) => Promise<any>;
  getTotal: () => Promise<any>;
  updateInvoice: (id: string, params: TypeInvoice) => Promise<any>;
}

const services: IInvoices = {
  createInvoice(params) {
    return api.post('invoices', params);
  },
  filter(params) {
    return api.get('invoices', { params });
  },
  getInvoiceById(params) {
    return api.get(`invoices/${params.id}`);
  },
  getInvoices() {
    return api.get('invoices');
  },
  getInvoicesByStudent(params) {
    return api.get('invoices/', { params });
  },
  getTotal() {
    return api.get('invoices/total');
  },
  updateInvoice(id, params) {
    return api.put(`invoices/${id}`, params);
  },
};

export default services;
