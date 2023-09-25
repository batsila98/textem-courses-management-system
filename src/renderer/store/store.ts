import React from 'react';
import { create } from 'zustand';
import TypeCertificate from 'renderer/models/Certificate';
import TypeCourseStatus from 'renderer/models/CourseStatus';
import TypeCourseTeachingFormat from 'renderer/models/CourseTeachingFormat';
import TypeCourseType from 'renderer/models/CourseType';
import TypeGender from 'renderer/models/Gender';
import TypeInvoiceType from 'renderer/models/InvoiceType';
import TypeLanguage from 'renderer/models/Language';
import TypeStudentStatus from 'renderer/models/StudentStatus';

interface IModal {
  buttonText?: string;
  buttonAction?: () => unknown;
  icon?: React.ReactNode;
  text: string;
  title: string;
}

interface IAppState {
  certificates: TypeCertificate[];
  courseStatuses: TypeCourseStatus[];
  courseTeachingFormats: TypeCourseTeachingFormat[];
  courseTypes: TypeCourseType[];
  genders: TypeGender[];
  invoiceTypes: TypeInvoiceType[];
  languages: TypeLanguage[];
  modal: IModal;
  modalVisibility: boolean;
  studentStatuses: TypeStudentStatus[];
  setCertificates: (value: TypeCertificate[]) => void;
  setCourseStatuses: (value: TypeCourseStatus[]) => void;
  setCourseTeachingFormats: (value: TypeCourseTeachingFormat[]) => void;
  setCourseTypes: (value: TypeCourseType[]) => void;
  setGenders: (value: TypeGender[]) => void;
  setInvoiceTypes: (value: TypeInvoiceType[]) => void;
  setLanguages: (value: TypeLanguage[]) => void;
  setModal: (value: IModal) => void;
  setModalVisibility: (value: boolean) => void;
  setStudentStatuses: (value: TypeStudentStatus[]) => void;
}

const useStore = create<IAppState>((set) => ({
  certificates: [],
  courseStatuses: [],
  courseTeachingFormats: [],
  courseTypes: [],
  genders: [],
  invoiceTypes: [],
  languages: [],
  modal: {
    buttonText: 'Close',
    text: '',
    title: '',
  },
  modalVisibility: false,
  studentStatuses: [],
  setCertificates: (value: TypeCertificate[]) => {
    set(() => ({ certificates: value }));
  },
  setCourseStatuses: (value: TypeCourseStatus[]) => {
    set(() => ({ courseStatuses: value }));
  },
  setCourseTeachingFormats: (value: TypeCourseTeachingFormat[]) => {
    set(() => ({ courseTeachingFormats: value }));
  },
  setCourseTypes: (value: TypeCourseType[]) => {
    set(() => ({ courseTypes: value }));
  },
  setGenders: (value: TypeGender[]) => {
    set(() => ({ genders: value }));
  },
  setInvoiceTypes: (value: TypeInvoiceType[]) => {
    set(() => ({ invoiceTypes: value }));
  },
  setLanguages: (value: TypeLanguage[]) => {
    set(() => ({ languages: value }));
  },
  setModal: (value: IModal) => {
    set(() => ({ modal: value }));
  },
  setModalVisibility: (value: boolean) => {
    set(() => ({ modalVisibility: value }));
  },
  setStudentStatuses: (value: TypeStudentStatus[]) => {
    set(() => ({ studentStatuses: value }));
  },
}));

export default useStore;
