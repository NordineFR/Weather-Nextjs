import Loading from '@/app/loading';
import {useEffect,useState} from 'react'
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
interface Props <T>{
    data:T;
}
const WeatherSlider = ({data}:Props<Record<string,any>>) => {
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        },1000);
      }, [data]);
  
    if(loading){
      return <Loading className="my-2 rounded-lg h-28 w-full" />
    }
    
  return (
    <Swiper 
                slidesPerView={4}
                spaceBetween={0}
                freeMode={true}
                centeredSlides
                centeredSlidesBounds
                className='mt-4 w-full'
                initialSlide={0}
                >
                <div className='flex flex-row flex-nowrap justify-between items-center text-center gap-2 w-full'>
                {   
                      (data?.forecast?.forecastday[0]?.hour).map((hourdata: { time: string | number | Date; condition: {
                        text: string | undefined; icon: string | undefined; 
}; temp_c: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; },i: React.Key | null | undefined)=>{
                        const currentHourIndex = new Date().getHours();
                        const hoursArray = data?.forecast?.forecastday[0]?.hour || [];
                        const hourIndex = hoursArray.indexOf(hourdata);

                        if (hourIndex >= currentHourIndex) {
                        return(<SwiperSlide 
                        key={i}
                        className=''
                        style={{width:'25%',height:'auto'}}
                      >
                          <div className={`text-center rounded-lg p-2 w-[85px] ${hourIndex === currentHourIndex ? 'bg-[#c4e2ff] [&>img]:invert [&>img]:brightness-0' : ''}`}>
                            <h5 className='text-sm font-medium capitalize mb-1'>{hourIndex === currentHourIndex ? 'Now' : new Date(hourdata.time).toLocaleTimeString('en-US', { hour: '2-digit', hour12: true })}</h5>
                            <img src={hourdata.condition.icon} className="text-center w-full h-[50px] object-cover" alt={hourdata.condition.text} />
                            <h4 className='font-semibold text-black text-md mt-1'>{hourdata.temp_c}°</h4>
                          </div>
                      </SwiperSlide>)
                        }
                      })
                }
                    </div>
                
              </Swiper>
  )
}

export default WeatherSlider