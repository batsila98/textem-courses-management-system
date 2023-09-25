import React from 'react';
import Header from 'renderer/components/Header/Header';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FormCertificates from './FormCertificates/FormCertificates';
import FormStudentStatuses from './FormStudentStatuses/FormStudentStatuses';
import FormCourseStatuses from './FormCourseStatuses/FormCourseStatuses';
import FormCourseTeachingFormats from './FormCourseTeachingFormats/FormCourseTeachingFormats';
import FormCourseTypes from './FormCourseTypes/FormCourseTypes';
import FormGenders from './FormGenders/FormGenders';
import FormInvoiceTypes from './FormInvoiceTypes/FormInvoiceTypes';
import FormLanguages from './FormLanguages/FormLanguages';
import styles from './Settings.module.scss';

const Settings = () => {
  return (
    <div className={styles.component}>
      <Header title="Settings" />

      <div className={styles.component__content}>
        <Tabs>
          <TabList>
            <Tab>Common</Tab>
            <Tab>Students</Tab>
            <Tab>Courses</Tab>
            <Tab>Invoices</Tab>
          </TabList>

          <TabPanel>
            <div className={styles.component__tabContent}>
              <div className={styles.component__half}>
                <FormGenders />
              </div>
              <div className={styles.component__half}>
                <FormLanguages />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.component__tabContent}>
              <FormStudentStatuses />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.component__tabContent}>
              <div className={styles.component__half}>
                <FormCertificates />
              </div>
              <div className={styles.component__half}>
                <FormCourseStatuses />
              </div>
              <div className={styles.component__half}>
                <FormCourseTeachingFormats />
              </div>
              <div className={styles.component__half}>
                <FormCourseTypes />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.component__tabContent}>
              <FormInvoiceTypes />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
