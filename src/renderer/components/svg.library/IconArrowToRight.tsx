import React from 'react';

type Props = {
  fill?: string;
};

const IconArrowToRight = ({ fill }: Props) => {
  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        width: '100%',
      }}
    >
      <path
        d="M84.688 229.824C81.6885 226.824 80.0034 222.755 80.0034 218.512C80.0034 214.269 81.6885 210.2 84.688 207.2L163.888 128L84.688 48.8C81.7735 45.7824 80.1608 41.7407 80.1972 37.5456C80.2337 33.3504 81.9164 29.3374 84.8829 26.3709C87.8495 23.4044 91.8625 21.7217 96.0576 21.6852C100.253 21.6488 104.294 23.2615 107.312 26.176L197.824 116.688C200.824 119.688 202.509 123.757 202.509 128C202.509 132.243 200.824 136.312 197.824 139.312L107.312 229.824C104.312 232.824 100.243 234.509 96 234.509C91.7574 234.509 87.6885 232.824 84.688 229.824Z"
        fill={fill}
      />
    </svg>
  );
};

IconArrowToRight.defaultProps = {
  fill: '#fff',
};

export default IconArrowToRight;
