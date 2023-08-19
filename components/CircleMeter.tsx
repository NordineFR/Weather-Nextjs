import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Arced } from "./gauges/arced";

interface Props{
    pressure:string
}

const CircleMeter = ({pressure}:Props) => {
    const pressureValue = parseFloat(pressure.replace('hpa', ''));
    const cappedPressureValue = pressureValue > 2000 ? 2000 : pressureValue;


    return (
        <Arced value={cappedPressureValue} />
  );
}

export default CircleMeter