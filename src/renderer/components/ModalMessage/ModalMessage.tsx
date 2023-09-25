import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from 'renderer/components/Button/Button';
import useStore from 'renderer/store/store';
import Heading from 'renderer/components/Heading/Heading';
import styles from './ModalMessage.module.scss';

const ModalMessage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modal = useStore((state) => state.modal);
  const modalVisibility = useStore((state) => state.modalVisibility);
  const setModalVisibility = useStore((state) => state.setModalVisibility);

  const close = () => {
    const tl = gsap.timeline();
    return tl
      .to(modalRef.current, {
        duration: 0.5,
        opacity: 0,
      })
      .to(
        wrapperRef.current,
        {
          duration: 0.5,
          opacity: 0,
        },
        '<+=0.2'
      )
      .set(wrapperRef.current, {
        visibility: 'hidden',
      });
  };

  const open = () => {
    const tl = gsap.timeline();
    return tl
      .set(wrapperRef.current, {
        visibility: 'visible',
      })
      .to(wrapperRef.current, {
        duration: 0.5,
        opacity: 1,
      })
      .to(
        modalRef.current,
        {
          duration: 0.5,
          opacity: 1,
        },
        '<+=0.2'
      );
  };

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      if (event.target === wrapperRef.current) {
        setModalVisibility(false);
      }
    },
    [setModalVisibility]
  );

  useEffect(() => {
    if (modalVisibility) {
      open();
    } else {
      close();
    }
  }, [modalVisibility]);

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div ref={wrapperRef} className={styles.component}>
      <div ref={modalRef} className={styles.component__modal}>
        {modal.icon && (
          <div className={styles.component__icon}>{modal.icon}</div>
        )}
        {modal.title && <Heading level={4}>{modal.title}</Heading>}
        {modal.text && (
          <div className={styles.component__text}>{modal.text}</div>
        )}
        <Button
          onClick={() => {
            if (modal.buttonAction) {
              modal.buttonAction();
              setModalVisibility(false);
            } else {
              setModalVisibility(false);
            }
          }}
          variant="primary"
        >
          {modal.buttonText || 'Close'}
        </Button>
      </div>
    </div>
  );
};

export default ModalMessage;
