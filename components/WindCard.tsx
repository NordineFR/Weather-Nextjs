import WindDirectionCircle from "./WindDirectionCircle";

interface Props{
    width:string
}

const WindCard = ({width}:Props) => {
    const windDirection = 45; // Replace with your wind direction value

  return (
    <div className={`p-6 flex flex-row  justify-between items-center rounded-lg gap-2 bg-[#ecf3f8] ${width} w-full `}>
        <div className="flex flex-col justify-between items-start text-left group:w-full">
            <h3 className="font-semibold text-black text-xl ">Wind</h3>
            <h3 className=" text-gray-400 text-md py-4">Today wind speed</h3>
            <h3 className="font-semibold text-black text-xl ">12km/h</h3>
        </div>
        <div>
            {/* <img src="/images/clouds.jpg" className=" h-20 w-20 rounded-full bg-cover"/> */}
            <WindDirectionCircle windDirection={windDirection} />
        </div>
    </div>
  )
}

export default WindCard