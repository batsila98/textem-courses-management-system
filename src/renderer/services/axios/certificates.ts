import TypeCertificate from 'renderer/models/Certificate';
import api from './axios';

export interface ICertificates {
  createCertificate: (params: TypeCertificate) => Promise<any>;
  getCertificateById: (params: { id: string }) => Promise<any>;
  getCertificatesByName: (params: { name: string }) => Promise<any>;
  getCertificates: () => Promise<any>;
  removeCertificate: (certificateId: string) => Promise<any>;
}

const services: ICertificates = {
  createCertificate(params) {
    return api.post('certificates', params);
  },
  getCertificateById(params) {
    return api.get(`certificates/${params.id}`);
  },
  getCertificatesByName(params) {
    return api.get('certificates', { params });
  },
  getCertificates() {
    return api.get('certificates');
  },
  removeCertificate(certificateId) {
    return api.delete(`certificates/${certificateId}`);
  },
};

export default services;
