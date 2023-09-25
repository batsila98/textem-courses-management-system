import React from 'react';

type Props = {
  fill?: string;
};

const IconLink = ({ fill }: Props) => {
  return (
    <svg
      width="80"
      height="40"
      viewBox="0 0 80 40"
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
        d="M7.6 20C7.6 13.16 13.16 7.6 20 7.6H32.2C34.2987 7.6 36 5.89868 36 3.8V3.8C36 1.70132 34.2987 0 32.2 0H20C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40H32.2C34.2987 40 36 38.2987 36 36.2V36.2C36 34.1013 34.2987 32.4 32.2 32.4H20C13.16 32.4 7.6 26.84 7.6 20ZM24 20C24 22.2091 25.7909 24 28 24H52C54.2091 24 56 22.2091 56 20V20C56 17.7909 54.2091 16 52 16H28C25.7909 16 24 17.7909 24 20V20ZM60 0H47.8C45.7013 0 44 1.70132 44 3.8V3.8C44 5.89868 45.7013 7.6 47.8 7.6H60C66.84 7.6 72.4 13.16 72.4 20C72.4 26.84 66.84 32.4 60 32.4H47.8C45.7013 32.4 44 34.1013 44 36.2V36.2C44 38.2987 45.7013 40 47.8 40H60C71.04 40 80 31.04 80 20C80 8.96 71.04 0 60 0Z"
        fill={fill}
      />
    </svg>
  );
};

IconLink.defaultProps = {
  fill: '#666687',
};

export default IconLink;
