import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import IconCheckmark from 'renderer/components/svg.library/IconCheckmark';
import IconCoinsHand from 'renderer/components/svg.library/IconCoinsHand';
import IconClock from 'renderer/components/svg.library/IconClock';
import IconLink from 'renderer/components/svg.library/IconLink';
import IconStand from 'renderer/components/svg.library/IconStand';
import IconStudents from 'renderer/components/svg.library/IconStudents';
import TypeNotification from 'renderer/models/Notification';
import servicesAxios from 'renderer/services/axios';
import styles from './NotificationCard.module.scss';

type Props = {
  data: TypeNotification;
  onReview?: () => void;
};

const NotificationCard = ({ data, onReview }: Props) => {
  const [reviewed, setReviewed] = useState<boolean>(data.viewed);

  const toggleReviewStatus = (reviewStatus: boolean) => {
    servicesAxios.notifications
      .editNotification(data._id, { viewed: !reviewStatus })
      .then((res) => {
        setReviewed(!reviewStatus);
        if (onReview) {
          onReview();
        }
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={classNames(
        styles.component,
        styles[`component_${data.type}`],
        styles[`component_${data.element}`]
      )}
    >
      <div className={styles.component__title}>
        <div className={styles.component__icon}>
          {data.element === 'payment' && <IconCoinsHand fill="#00A6FF" />}
          {data.element === 'course' && <IconStand fill="#00A6FF" />}
          {data.element === 'student' && <IconStudents fill="#00A6FF" />}
        </div>
        {data.element}
      </div>
      <button
        className={classNames(
          styles.component__buttonReview,
          reviewed ? styles.component__buttonReview_reviewed : null
        )}
        type="button"
        onClick={() => toggleReviewStatus(reviewed)}
      >
        {reviewed ? <IconCheckmark fill="#ffffff" /> : null}
      </button>
      <div className={styles.component__content}>
        <div className={styles.component__text}>{data.text}</div>
        {data.element === 'payment' && (
          <>
            <div className={styles.component__row}>
              <div className={styles.component__textAccent}>Student:</div>{' '}
              {data.item.student.full_name}
            </div>
            <div className={styles.component__row}>
              <div className={styles.component__textAccent}>Course:</div>{' '}
              {data.item.course.name}
            </div>
            <div className={styles.component__link}>
              <NavLink to={`payments/${data.item._id}`}>
                <IconLink fill="#00A6FF" />
              </NavLink>
            </div>
            <div className={styles.component__date}>
              <div className={styles.component__icon}>
                <IconClock fill="#999" />
              </div>
              {new Date(data.date_creation).toLocaleDateString()}
            </div>
          </>
        )}
        {data.element === 'course' && (
          <>
            <div className={styles.component__row}>
              <div className={styles.component__textAccent}>Course:</div>{' '}
              {data.item.name}
            </div>
            <div className={styles.component__row}>
              {data.item.date_start && (
                <div className={styles.component__row}>
                  <div className={styles.component__textAccent}>
                    Start date:
                  </div>{' '}
                  {new Date(data.item.date_start).toLocaleDateString()}
                </div>
              )}
              {data.item.date_end && (
                <div className={styles.component__row}>
                  <div className={styles.component__textAccent}>
                    Expiration date:
                  </div>{' '}
                  {new Date(data.item.date_end).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className={styles.component__link}>
              <NavLink to={`courses/${data.item._id}`}>
                <IconLink fill="#00A6FF" />
              </NavLink>
            </div>
            <div className={styles.component__date}>
              <div className={styles.component__icon}>
                <IconClock fill="#999" />
              </div>
              {new Date(data.date_creation).toLocaleDateString()}
            </div>
          </>
        )}
        {data.element === 'student' && (
          <>
            <div className={styles.component__row}>
              <div className={styles.component__textAccent}>Student:</div>{' '}
              {data.item.full_name}
            </div>
            <div className={styles.component__row}>
              <div className={styles.component__textAccent}>Course:</div>{' '}
              {data.item.course.name}
            </div>
            {data.item.course.date_access_end && (
              <div className={styles.component__row}>
                <div className={styles.component__textAccent}>
                  Access expiration date:
                </div>{' '}
                {new Date(
                  data.item.course.date_access_end
                ).toLocaleDateString()}
              </div>
            )}
            <div className={styles.component__link}>
              <NavLink to={`courses/${data.item.course._id}`}>
                <IconLink fill="#00A6FF" />
              </NavLink>
            </div>
            <div className={styles.component__date}>
              <div className={styles.component__icon}>
                <IconClock fill="#999" />
              </div>
              {new Date(data.date_creation).toLocaleDateString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

NotificationCard.defaultProps = {
  onReview: () => {},
};

export default NotificationCard;
