import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface Props {
    color: string;
    data: {
      timeSlot: string;
      temperature: number | null;
    }[];
  }

const RenderLineChart  = ({ color,data }:Props) => {
    const dataChart: any[] | undefined = []
    data.map((timeSlotData)=>{
      dataChart.push({
        name:timeSlotData.timeSlot,
        pv:timeSlotData.temperature
      })
    })
    return (
    <ResponsiveContainer width="100%" height={80}>
            <LineChart className="[&>svg]:overflow-visible" width={400} height={400} data={dataChart}>
                    <Line  type="monotone" dataKey="pv" stroke={color} strokeWidth={2}  dot={{ r: 6 }} />
            </LineChart>
    </ResponsiveContainer>
    ) 
}

export default RenderLineChart 