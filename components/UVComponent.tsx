import React from 'react'
import { Uvarced } from './gauges/uvarced'
interface Props{
    uvIndex:string
}
const UVComponent = ({uvIndex}:Props) => {
    const floatNumber = parseFloat(uvIndex);
    const uvIndexnumber =  (floatNumber / 11) * 100;
  return (
    <Uvarced value={uvIndexnumber}/>
  )
}

export default UVComponent