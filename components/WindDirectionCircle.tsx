import React from 'react';
import circle  from 'react-svg';

interface Props {
  windDirection: number;
}

const WindDirectionCircle= ({ windDirection }:Props) => {
  const defaultwindDirection = windDirection - 47;
  return (
      <div className='flex-1 relative flex flex-col justify-center items-center '>
        <img src="/images/wind_direction.png" alt="" height={130} width={130} />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <img
            src="/images/pointer_arrow.png"
            alt=""
            className='max-w-full max-h-full p-3'
            style={{ transform: `rotate(${defaultwindDirection}deg)` }}
          />
        </div>

        </div>
  );
};

export default WindDirectionCircle;
