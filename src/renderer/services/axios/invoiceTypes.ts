import api from './axios';

export interface IInvoiceTypes {
  addInvoiceType: (params: { name: string }) => Promise<any>;
  getInvoiceTypeById: (id: string) => Promise<any>;
  getInvoiceTypes: () => Promise<any>;
  removeInvoiceType: (id: string) => Promise<any>;
}

const services: IInvoiceTypes = {
  addInvoiceType(params) {
    return api.post('invoice_types', params);
  },
  getInvoiceTypeById(id) {
    return api.get(`invoice_types/${id}`);
  },
  getInvoiceTypes() {
    return api.get('invoice_types');
  },
  removeInvoiceType(id) {
    return api.delete(`invoice_types/${id}`);
  },
};

export default services;
