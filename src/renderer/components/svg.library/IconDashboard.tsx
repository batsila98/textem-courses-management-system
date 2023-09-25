import React from 'react';

type Props = {
  fill?: string;
};

const IconDashboard = ({ fill }: Props) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        width: '100%',
      }}
    >
      <title>Dashboard</title>
      <g
        id="Dashboard"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect id="Container" x="0" y="0" width="24" height="24" />
        <rect
          id="shape-1"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
        />
        <line
          x1="4"
          y1="9"
          x2="20"
          y2="9"
          id="shape-2"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="10"
          x2="9"
          y2="20"
          id="shape-3"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

IconDashboard.defaultProps = {
  fill: '#666687',
};

export default IconDashboard;
