import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import classNames from 'classnames';
import Button from 'renderer/components/Button/Button';
import Heading from 'renderer/components/Heading/Heading';
import IconBell from 'renderer/components/svg.library/IconBell';
import IconClose from 'renderer/components/svg.library/IconClose';
import NotificationCard from 'renderer/components/NotificationCard/NotificationCard';
import Placeholder from 'renderer/components/Placeholder/Placeholder';
import TypeNotification from 'renderer/models/Notification';
import servicesAxios from 'renderer/services/axios';
import styles from './WidgetNotifications.module.scss';

const WidgetNotifications = () => {
  const [allNotifications, setAllNotifications] = useState<TypeNotification[]>(
    []
  );
  const [notifications, setNotifications] = useState<TypeNotification[]>([]);
  const [isFullListArchive, setIsFullListArchive] = useState<boolean>(false);
  const [isFullList, setIsFullList] = useState<boolean>(false);
  const [totalUnread, setTotalUnread] = useState<number>(0);
  const iconBell = useRef<HTMLDivElement>(null);

  const fetchAllNotifications = useCallback(() => {
    servicesAxios.notifications
      .getNotifications(isFullListArchive ? {} : { viewed: false })
      .then((res) => {
        setAllNotifications(res.data);
        return res.data;
      })
      .catch((err) => {
        alert(err);
      });
  }, [isFullListArchive]);

  const fetchLatestNotifications = () => {
    servicesAxios.notifications
      .getNotifications({ limit: 2, viewed: false })
      .then((res) => {
        setNotifications(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTotalUnreadNitifications = () => {
    servicesAxios.notifications
      .getTotalUnread()
      .then((res) => {
        setTotalUnread(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isFullList) {
      fetchAllNotifications();
    }
  }, [fetchAllNotifications, isFullList]);

  useEffect(() => {
    fetchLatestNotifications();
    fetchTotalUnreadNitifications();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.set(iconBell.current, {
      x: 0,
    })
      .to(iconBell.current, {
        duration: 0.7,
        ease: 'power1.inOut',
        rotation: -10,
        x: 3,
      })
      .to(iconBell.current, {
        duration: 0.7,
        ease: 'power1.inOut',
        rotation: 10,
        x: -3,
      })
      .to(iconBell.current, {
        duration: 0.5,
        ease: 'power1.inOut',
        rotation: 0,
        x: 0,
      });

    return () => {
      tl.kill();
    };
  }, [totalUnread]);

  return (
    <div className={styles.component}>
      <div className={styles.component__heading}>
        <Heading level={5}>Notifications</Heading>
        {totalUnread > 0 && (
          <div className={styles.component__unreadAmount}>
            <div ref={iconBell} className={styles.component__unreadAmountIcon}>
              <IconBell fill="#fff" />
            </div>
            {totalUnread}
          </div>
        )}
      </div>
      <div className={styles.component__content}>
        {notifications && notifications.length ? (
          notifications?.map((notification) => {
            return (
              <div
                key={notification._id}
                className={styles.component__notification}
              >
                <NotificationCard
                  data={notification}
                  onReview={() => {
                    fetchLatestNotifications();
                    fetchTotalUnreadNitifications();
                  }}
                />
              </div>
            );
          })
        ) : (
          <Placeholder />
        )}
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          setIsFullList(true);
        }}
      >
        View all
      </Button>
      <div
        className={classNames(
          styles.component__fullList,
          isFullList && styles.component__fullList_visible
        )}
      >
        <div className={styles.component__fullListHeading}>
          <Heading level={5}>All notifications</Heading>
          <button
            className={styles.component__fullListButton}
            onClick={() => setIsFullList(false)}
            type="button"
          >
            <IconClose fill="#00A6FF" />
          </button>
        </div>
        <div className={styles.component__fullListToggle}>
          <Button
            variant={isFullListArchive ? 'tertiary' : 'primary'}
            onClick={() => {
              setIsFullListArchive(false);
            }}
          >
            Unread only
          </Button>
          <Button
            variant={isFullListArchive ? 'primary' : 'tertiary'}
            onClick={() => {
              setIsFullListArchive(true);
            }}
          >
            Archive
          </Button>
        </div>
        <div className={styles.component__fullListContent}>
          {allNotifications && allNotifications.length ? (
            allNotifications?.map((notification) => {
              return (
                <div
                  key={notification._id}
                  className={styles.component__notification}
                >
                  <NotificationCard
                    data={notification}
                    onReview={() => {
                      fetchAllNotifications();
                      fetchLatestNotifications();
                      fetchTotalUnreadNitifications();
                    }}
                  />
                </div>
              );
            })
          ) : (
            <Placeholder />
          )}
          {}
        </div>
      </div>
    </div>
  );
};

export default WidgetNotifications;
