import React from 'react';

type Props = {
  fill?: string;
};

const IconPen = ({ fill }: Props) => {
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
        d="M32 184V224H72L189.973 106.027L149.973 66.0267L32 184ZM220.907 75.0933C221.896 74.1065 222.68 72.9344 223.215 71.644C223.751 70.3536 224.026 68.9703 224.026 67.5733C224.026 66.1763 223.751 64.7931 223.215 63.5027C222.68 62.2123 221.896 61.0401 220.907 60.0533L195.947 35.0933C194.96 34.1045 193.788 33.32 192.497 32.7847C191.207 32.2494 189.824 31.9739 188.427 31.9739C187.03 31.9739 185.646 32.2494 184.356 32.7847C183.066 33.32 181.893 34.1045 180.907 35.0933L161.387 54.6133L201.387 94.6133L220.907 75.0933Z"
        fill={fill}
      />
    </svg>
  );
};

IconPen.defaultProps = {
  fill: '#666687',
};

export default IconPen;
