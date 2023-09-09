import React from 'react';

const CustomMarkerIcon = ({ iconUrl, temperature }) => {
  return (
    <div className="custom-icon bg-opacity-80 bg-gray-300 rounded-md flex flex-col justify-center items-center w-11 h-fit border-[1px] border-gray-500">
      <img src={iconUrl} alt="Weather Icon"  className='h-10 w-12 object-contain'/>
      <div style={{ fontWeight: 'bold' }}>{temperature}°C</div>
    </div>
  );
};

export default CustomMarkerIcon;