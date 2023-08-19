import React from 'react';
import circle  from 'react-svg';

interface Props {
  windDirection: number | undefined;
}

const WindDirectionCircle= ({ windDirection }:Props) => {
  const defaultwindDirection = (windDirection ? windDirection : 0) - 47;
  // svg params
    const fillPercentage=1;
    const radius = 45; 
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(fillPercentage * circumference) / 100}`

    const labelDistance = radius - 25 * 0.5; 
    const labelPositions = [
      { x: 50, y: 50 - labelDistance, text: 'N' },
      { x: 50 - labelDistance, y: 50, text: 'W' },
      { x: 50, y: 50 + labelDistance, text: 'S' },
      { x: 50 + labelDistance, y: 50, text: 'E' },
    ];
    // end of svg
  return (
      <div className='flex-1 relative flex flex-col justify-center items-center '>
        {/* <img src="/images/wind_direction.png" alt="" height={130} width={130} /> */}
        {/* making the image using svg  */}
        <svg viewBox="0 0 100 100" className="w-[130px] h-[130px] max-w-full max-h-full">
        {labelPositions.map(({ x, y, text }, index) => (
          <text key={index} x={x} y={y} textAnchor="middle" alignmentBaseline="middle" fontSize="12" fill="black" className='font-semibold'>
            {text}
          </text>
        ))}
        <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={`#c4e2ff`}
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* end of svg */}
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <img
            src="/images/pointer_arrow.png"
            alt=""
            className='max-w-full max-h-full p-4'
            style={{ transform: `rotate(${defaultwindDirection}deg)` }}
          />
        </div>

        </div>
  );
};

export default WindDirectionCircle;
