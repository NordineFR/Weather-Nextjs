import React from 'react';

const CustomMarkerIcon = ({ iconUrl, temperature }) => {
  return (
    <div className="custom-icon flex flex-col justify-center items-center w-11 h-fit border-[1px] border-gray-400 bg-opacity-50 bg-blur-lg bg-gray-200 backdrop-blur-lg rounded-md">
      <img src={`https://openweathermap.org/img/wn/${iconUrl}.png`} alt="Weather Icon"  className='h-11 w-12 object-contain '/>
      <div className='font-bold text-[11px]'>{temperature} °C</div>
    </div>
  );
};

export default CustomMarkerIcon;
