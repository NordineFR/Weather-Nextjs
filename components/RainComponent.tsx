import React from 'react'

interface Props{
    rainChance:string;
}
const RainComponent = ({rainChance}:Props) => {

    const numericValue = parseFloat(rainChance.replace('%', ''));
    const fillPercentage=numericValue > 100 ? 100 : numericValue;
    
    const radius = 45; // Circle radius in pixels
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (fillPercentage * circumference) / 100;

    let label = '';
    if (fillPercentage <= 33) {
      label = 'low';
    } else if (fillPercentage <= 66) {
      label = 'medium';
    } else if(fillPercentage > 66) {
      label = 'high';
    }else{
        label = 'Empty';
    }
    return (
      <div className="relative border-50">
      <svg viewBox="0 0 100 100" className="w-[130px] h-[130px] max-h-full max-w-full">
          <circle
           cx="50"
           cy="50"
           r={radius}
           fill="transparent"
           stroke={`#c4e2ff`} // Use a lighter color for the remaining part
           strokeWidth="8"
           strokeDasharray={circumference}
           transform="rotate(-90 50 50)"
           className='w-full h-full'
         />
         {/* filled circle */}
        <circle
        className='w-full h-full'
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke={`#24609b`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="50" textAnchor="middle" alignmentBaseline="central" fontSize="16" fill="black" className='font-semibold capitalize text-md'>
          {label}
        </text>
      </svg>
      
      </div>
    );
}

export default RainComponent