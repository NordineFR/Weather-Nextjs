import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface Props{
    pressure:string
}

const CircleMeter = ({pressure}:Props) => {
    const numericValue = parseFloat(pressure.replace('hpa', ''));
    const pressureValue = numericValue;


  return (
    <div className="w-[130px] h-[130px] max-w-full max-h-full">
        
    </div>
  );
}

export default CircleMeter