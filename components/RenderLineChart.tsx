import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface Props {
    color: string;
  }

const RenderLineChart  = ({ color }:Props) => {
    const data = [
        { name: 'Page A', pv: 2400, amt: 2400 },
        { name: 'Page B', pv: 1600, amt: 2400 },
        { name: 'Page C', pv: 2400, amt: 2400 },
        { name: 'Page D', pv: 1600, amt: 2400 },
      ];
    return (
    <ResponsiveContainer className="" width="100%" height={80}>
            <LineChart width={400} height={400} data={data}>
                    <Line type="monotone" dataKey="pv" stroke={color} strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
    </ResponsiveContainer>
    ) 
}

export default RenderLineChart 