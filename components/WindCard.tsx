import WindDirectionCircle from "./WindDirectionCircle";
import RainComponent from "./RainComponent";
import CircleMeter from "./CircleMeter";
import UVComponent from "./UVComponent";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";


interface Props{
    title:string;
    desc:string;
    windDirection?:number;
    value:string;
    type:string;
}

const WindCard = ({title,desc,windDirection,value,type}:Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    },1000);
  }, []);
  if (loading) {
    return <Loading className="p-6 grid grid-cols-2 gap-1 rounded-lg h-44 w-full" />;
  }
  return (
    <div className={`p-6 grid grid-cols-2 gap-1 rounded-lg bg-[#ecf3f8] w-full `}>
        <div className="flex flex-col justify-between items-start text-left group:w-full">
            <h3 className="font-semibold text-black text-xl ">{title}</h3>
            <h3 className=" text-gray-400 text-md py-4">{desc}</h3>
            <h3 className="font-semibold text-black text-xl ">{value}</h3>
        </div>
        <div className="flex flex-col justify-center items-end text-left group:w-full">
          {type === 'wind' && <WindDirectionCircle windDirection={windDirection} />}
          {type === 'rain' && <RainComponent rainChance={value}/>}
          {type === 'pressure' && <CircleMeter pressure={value} />}
          {type === 'uvi' && <UVComponent uvIndex={value} />}
        </div>
    </div>
  )
}

export default WindCard