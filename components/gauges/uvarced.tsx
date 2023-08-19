import React from "react";
import { useGauge } from "use-gauge";

interface ArcedProps {
  value: number;
}

const START_ANGLE = 45;
const END_ANGLE = 315;

export function Uvarced(props: ArcedProps) {
  const { value } = props;
  const gauge = useGauge({
    domain: [0, 100],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 41,
    diameter: 130
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 7
  });
  function getUVIndexText(value: number): string {
    const originalValue = (value / 100) * 11;

    if (originalValue < 3) {
      return "Low";
    } else if (originalValue < 6) {
      return "Moderate";
    } else if (originalValue < 8) {
      return "High";
    } else if (originalValue < 11) {
      return "Very High";
    } else if(originalValue > 11){
      return "Extreme";
    }else{
      return "Empty";
    }
  }
  const uvIndexText = getUVIndexText(value);
  return (
    <div className="max-w-full max-h-full">
      <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
        <g id="arcs">
          <path
            {...gauge.getArcProps({
              offset: 0,
              startAngle: START_ANGLE,
              endAngle: END_ANGLE
            })}
            fill="none"
            className="stroke-blue-100"
            strokeLinecap="round"
            strokeWidth={8}
          />
            <defs>
            <linearGradient id="stroke-gradient" x1="25%" y1="100%" x2="100%" y2="75%">
            <stop offset="0%" stopColor="#4CB482" />
            <stop offset="40%" stopColor="#edf872" /> {/* Yellow */}
            <stop offset="60%" stopColor="#ffa150" /> {/* Orange */}
            <stop offset="100%" stopColor="#FF5D42" />
            </linearGradient>   
            </defs>
            <path
                {...gauge.getArcProps({
                offset: 0,
                startAngle: START_ANGLE,
                endAngle: END_ANGLE
                })}
                fill="none" 
                stroke="url(#stroke-gradient)"
                strokeLinecap="round"
                strokeWidth={8}
            />
        </g>
        <g id="needle">
          <circle className="fill-white stroke-[#ecf3f8] shadow-md" strokeWidth={2} {...needle.tip} />
        </g>
        <text x="0" y="5" textAnchor="middle"  font-size="16" className="font-semibold text-2xl text-black" fill="#333">
          {uvIndexText}
        </text>
      </svg>
    </div>
  );
}
