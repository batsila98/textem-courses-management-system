import React from 'react';

type Props = {
  fill?: string;
};

const IconFilter = ({ fill }: Props) => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.245117 2C0.245117 1.44772 0.692832 1 1.24512 1H11.2451C11.7974 1 12.2451 1.44772 12.2451 2C12.2451 2.55228 11.7974 3 11.2451 3H1.24512C0.692832 3 0.245117 2.55228 0.245117 2ZM2.24512 6C2.24512 5.44772 2.69283 5 3.24512 5H9.24512C9.7974 5 10.2451 5.44772 10.2451 6C10.2451 6.55228 9.7974 7 9.24512 7H3.24512C2.69283 7 2.24512 6.55228 2.24512 6ZM5.24512 9C4.69283 9 4.24512 9.44771 4.24512 10C4.24512 10.5523 4.69283 11 5.24512 11H7.24512C7.7974 11 8.24512 10.5523 8.24512 10C8.24512 9.44771 7.7974 9 7.24512 9H5.24512Z"
        fill={fill}
      />
    </svg>
  );
};

IconFilter.defaultProps = {
  fill: '#666687',
};

export default IconFilter;
