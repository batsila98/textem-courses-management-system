import api from './axios';

export interface ILanguages {
  addLanguage: (params: { name: string }) => Promise<any>;
  getLanguageByName: (params: { name: string }) => Promise<any>;
  getLanguages: () => Promise<any>;
  removeLanguage: (languageId: string) => Promise<any>;
}

const services: ILanguages = {
  addLanguage(params) {
    return api.post('languages', params);
  },
  getLanguageByName(params) {
    return api.get('languages', { params });
  },
  getLanguages() {
    return api.get('languages');
  },
  removeLanguage(languageId) {
    return api.delete(`languages/${languageId}`);
  },
};

export default services;
