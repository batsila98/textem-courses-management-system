import React from 'react';

type Props = {
  fill?: string;
};

const IconTrash = ({ fill }: Props) => {
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
        d="M202.667 42.6667H165.333L154.667 32H101.333L90.6667 42.6667H53.3333V64H202.667M64 202.667C64 208.325 66.2476 213.751 70.2484 217.752C74.2492 221.752 79.6754 224 85.3333 224H170.667C176.325 224 181.751 221.752 185.752 217.752C189.752 213.751 192 208.325 192 202.667V74.6667H64V202.667Z"
        fill={fill}
      />
    </svg>
  );
};

IconTrash.defaultProps = {
  fill: '#FF3D00',
};

export default IconTrash;
