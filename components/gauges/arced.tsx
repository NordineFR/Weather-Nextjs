import React from "react";
import { useGauge } from "use-gauge";

interface ArcedProps {
  value: number;
}

const START_ANGLE = 45;
const END_ANGLE = 315;

export function Arced(props: ArcedProps) {
  const { value } = props;
  const gauge = useGauge({
    domain: [0, 2000],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 41,
    diameter: 130
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 2
  });

  return (
    <div className="max-w-full max-h-full">
      <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
        <g id="arcs">
          <path
            {...gauge.getArcProps({
              offset: 3,
              startAngle: START_ANGLE,
              endAngle: END_ANGLE
            })}
            fill="none"
            className="stroke-blue-100"
            strokeLinecap="round"
            strokeWidth={16}
          />
            <path
                {...gauge.getArcProps({
                offset: 3,
                startAngle: START_ANGLE,
                endAngle: gauge.valueToAngle(value)
                })}
                fill="none"
                className="stroke-blue-300"
                strokeLinecap="round"
                strokeWidth={16}
            />
        </g>
        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle);
            const showText = asValue === 20 || asValue === 80 || asValue === 50;

            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  className="stroke-gray-300"
                  strokeWidth={2}
                  {...gauge.getTickProps({ angle, length: showText ? 12 : 6 })}
                />
                {showText && (
                  <text
                    className="text-sm fill-gray-400 font-medium"
                    {...gauge.getLabelProps({ angle, offset: 20 })}
                  >
                    {asValue}
                  </text>
                )}
              </React.Fragment>
            );
          })}
        </g>
        <g id="needle">
          <circle className="fill-gray-300" {...needle.base} r={20} />
          <circle className="fill-gray-700" {...needle.base} />
          <circle className="fill-gray-700" {...needle.tip} />
          <polyline className="fill-gray-700" points={needle.points} />
          <circle className="fill-white" {...needle.base} r={4} />
        </g>
      </svg>
    </div>
  );
}
