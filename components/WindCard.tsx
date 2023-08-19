import WindDirectionCircle from "./WindDirectionCircle";
import RainComponent from "./RainComponent";
import CircleMeter from "./CircleMeter";

interface Props{
    title:string
    desc:string
    windDirection:number
    value:string
    type:string

}

const WindCard = ({title,desc,windDirection,value,type}:Props) => {

  return (
    <div className={`p-6 flex flex-row  justify-between items-center rounded-lg gap-2 bg-[#ecf3f8] w-full `}>
        <div className="flex flex-col justify-between items-start text-left group:w-full">
            <h3 className="font-semibold text-black text-xl ">{title}</h3>
            <h3 className=" text-gray-400 text-md py-4">{desc}</h3>
            <h3 className="font-semibold text-black text-xl ">{value}</h3>
        </div>
        <div>
          {type === 'wind' && <WindDirectionCircle windDirection={windDirection} />}
          {type === 'rain' && <RainComponent rainChance={value}/>}
          {type === 'pressure' && <CircleMeter pressure={value} />}
          {/* {type === 'sunshine' && <SunshineComponent />} */}
        </div>
    </div>
  )
}

export default WindCard