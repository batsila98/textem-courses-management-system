import React from 'react';

type Props = {
  fill?: string;
};

const IconArrowToLeft = ({ fill }: Props) => {
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
        d="M171.312 26.176C174.312 29.1765 175.997 33.2454 175.997 37.488C175.997 41.7306 174.312 45.7996 171.312 48.8L92.112 128L171.312 207.2C174.227 210.218 175.839 214.259 175.803 218.454C175.766 222.65 174.084 226.663 171.117 229.629C168.151 232.596 164.138 234.278 159.942 234.315C155.747 234.351 151.706 232.739 148.688 229.824L58.176 139.312C55.1764 136.312 53.4914 132.243 53.4914 128C53.4914 123.757 55.1764 119.688 58.176 116.688L148.688 26.176C151.688 23.1765 155.757 21.4914 160 21.4914C164.243 21.4914 168.312 23.1765 171.312 26.176Z"
        fill={fill}
      />
    </svg>
  );
};

IconArrowToLeft.defaultProps = {
  fill: '#fff',
};

export default IconArrowToLeft;
