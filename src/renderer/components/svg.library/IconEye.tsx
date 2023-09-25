import React from 'react';

type Props = {
  fill?: string;
};

const IconEye = ({ fill }: Props) => {
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
        d="M128 96C119.513 96 111.374 99.3714 105.373 105.373C99.3714 111.374 96 119.513 96 128C96 136.487 99.3714 144.626 105.373 150.627C111.374 156.629 119.513 160 128 160C136.487 160 144.626 156.629 150.627 150.627C156.629 144.626 160 136.487 160 128C160 119.513 156.629 111.374 150.627 105.373C144.626 99.3714 136.487 96 128 96ZM128 181.333C113.855 181.333 100.29 175.714 90.2876 165.712C80.2857 155.71 74.6667 142.145 74.6667 128C74.6667 113.855 80.2857 100.29 90.2876 90.2876C100.29 80.2857 113.855 74.6667 128 74.6667C142.145 74.6667 155.71 80.2857 165.712 90.2876C175.714 100.29 181.333 113.855 181.333 128C181.333 142.145 175.714 155.71 165.712 165.712C155.71 175.714 142.145 181.333 128 181.333ZM128 48C74.6667 48 29.12 81.1733 10.6667 128C29.12 174.827 74.6667 208 128 208C181.333 208 226.88 174.827 245.333 128C226.88 81.1733 181.333 48 128 48Z"
        fill={fill}
      />
    </svg>
  );
};

IconEye.defaultProps = {
  fill: '#666687',
};

export default IconEye;