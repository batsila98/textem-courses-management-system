import React from 'react';

type Props = {
  fill?: string;
};

const IconClock = ({ fill }: Props) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
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
        d="M39.96 0C17.88 0 0 17.92 0 40C0 62.08 17.88 80 39.96 80C62.08 80 80 62.08 80 40C80 17.92 62.08 0 39.96 0ZM40 72C22.32 72 8 57.68 8 40C8 22.32 22.32 8 40 8C57.68 8 72 22.32 72 40C72 57.68 57.68 72 40 72Z"
        fill={fill}
      />
      <path
        d="M42 23C42 21.3431 40.6569 20 39 20V20C37.3431 20 36 21.3431 36 23V42.3014C36 43.3552 36.5529 44.3317 37.4565 44.8739L54.5531 55.1318C55.9073 55.9444 57.6634 55.512 58.4856 54.1636V54.1636C59.319 52.7968 58.875 51.0125 57.4983 50.1957L43.4692 41.8717C42.5584 41.3313 42 40.3507 42 39.2917V23Z"
        fill={fill}
      />
    </svg>
  );
};

IconClock.defaultProps = {
  fill: '#666687',
};

export default IconClock;
