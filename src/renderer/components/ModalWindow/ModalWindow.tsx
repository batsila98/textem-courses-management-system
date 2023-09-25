import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import IconClose from 'renderer/components/svg.library/IconClose';
import styles from './ModalWindow.module.scss';

type Props = {
  children: React.ReactNode;
  onCloseAction: () => void;
};

const ModalWindow = ({ children, onCloseAction }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
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
      })
      .then((res) => {
        onCloseAction();
        return res;
      });
  }, [onCloseAction]);

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
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    open();
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div ref={wrapperRef} className={styles.component}>
      <div ref={modalRef} className={styles.component__modal}>
        <button
          className={styles.component__button}
          type="button"
          onClick={() => close()}
        >
          <IconClose fill="#ffffff" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
