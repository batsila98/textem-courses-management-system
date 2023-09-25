import React, { useEffect } from 'react';
import ChartNumberOfNewStudents from 'renderer/components/ChartNumberOfNewStudents/ChartNumberOfNewStudents';
import ChartStudentsCertificates from 'renderer/components/ChartStudentsCertificates/ChartStudentsCertificates';
import WidgetLastCreatedCourses from 'renderer/components/WidgetLastCreatedCourses/WidgetLastCreatedCourses';
import WidgetLastCreatedPayments from 'renderer/components/WidgetLastCreatedPayments/WidgetLastCreatedPayments';
import WidgetLastCreatedStudents from 'renderer/components/WidgetLastCreatedStudents/WidgetLastCreatedStudents';
import WidgetNotifications from 'renderer/components/WidgetNotifications/WidgetNotifications';
import WidgetTopTeachers from 'renderer/components/WidgetTopTeachers/WidgetTopTeachers';
import WidgetTotals from 'renderer/components/WidgetTotals/WidgetTotals';
import useStore from 'renderer/store/store';
import servicesAxios from 'renderer/services/axios';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const setCertificates = useStore((state) => state.setCertificates);
  const setCourseStatuses = useStore((state) => state.setCourseStatuses);
  const setCourseTeachingFormats = useStore(
    (state) => state.setCourseTeachingFormats
  );
  const setCourseTypes = useStore((state) => state.setCourseTypes);
  const setGenders = useStore((state) => state.setGenders);
  const setInvoiceTypes = useStore((state) => state.setInvoiceTypes);
  const setLanguages = useStore((state) => state.setLanguages);
  const setModal = useStore((state) => state.setModal);
  const setModalVisibility = useStore((state) => state.setModalVisibility);
  const setStudentStatuses = useStore((state) => state.setStudentStatuses);

  useEffect(() => {
    servicesAxios.certificates
      .getCertificates()
      .then((res) => {
        setCertificates(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.courseStatuses
      .getStatuses()
      .then((res) => {
        setCourseStatuses(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.courseTeachingFormats
      .getTeachingFormats()
      .then((res) => {
        setCourseTeachingFormats(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.courseTypes
      .getCourseTypes()
      .then((res) => {
        setCourseTypes(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.genders
      .getGenders()
      .then((res) => {
        setGenders(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.invoiceTypes
      .getInvoiceTypes()
      .then((res) => {
        setInvoiceTypes(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.languages
      .getLanguages()
      .then((res) => {
        setLanguages(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });

    servicesAxios.studentStatuses
      .getStatuses()
      .then((res) => {
        setStudentStatuses(res.data);
        return res.data;
      })
      .catch((err) => {
        setModal({
          text: String(err.response.data.message),
          title: 'Fail',
        });
        setModalVisibility(true);
      });
  }, [
    setCertificates,
    setCourseStatuses,
    setCourseTeachingFormats,
    setCourseTypes,
    setGenders,
    setInvoiceTypes,
    setLanguages,
    setModal,
    setModalVisibility,
    setStudentStatuses,
  ]);

  return (
    <div className={styles.component}>
      <div className={styles.component__totals}>
        <WidgetTotals />
      </div>
      <div className={styles.component__newStudents}>
        <ChartNumberOfNewStudents />
      </div>
      <div className={styles.component__studentsCertificates}>
        <ChartStudentsCertificates />
      </div>
      <div className={styles.component__lastCreatedCourses}>
        <WidgetLastCreatedCourses />
      </div>
      <div className={styles.component__lastCreatedStudents}>
        <WidgetLastCreatedStudents />
      </div>
      <div className={styles.component__lastCreatedPayments}>
        <WidgetLastCreatedPayments />
      </div>
      <div className={styles.component__topTeachers}>
        <WidgetTopTeachers />
      </div>
      <div className={styles.component__notifications}>
        <WidgetNotifications />
      </div>
    </div>
  );
};

export default Dashboard;
