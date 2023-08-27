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
  const weatherStatus = data?.current?.condition?.code;
  const localHour = new Date(data?.location?.localtime).getHours();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        },1000);
      }, [data]);
  
    if(loading){
      return <Loading className="my-2 rounded-lg h-28 w-full" />
    }
    let backgroundColor = "";
    let color = "";
    let isNight = false;
    if (localHour >= 21 || localHour < 6) {
      isNight = true;
    }
    switch (weatherStatus) {
      case 1000: // Sunny
        backgroundColor = isNight ? "bg-[#233b52]" : "bg-[#ffd89e]";
        color = isNight ? "text-white" : "text-black";
        break;
      case 1003: // Partly cloudy
      case 1006: // Cloudy
      case 1009: // Overcast
        backgroundColor = isNight ? "bg-[#233b52]" : "bg-[#c4e2ff]";
        color = isNight ? "text-white" : "text-[#24609b]";
        break;
      case 1135: // Fog
      case 1147: // Freezing fog
      case 1030: // Mist
        backgroundColor = isNight ? "bg-[#233b52]" : "bg-[#ADB8CB]";
        color = "text-white";
        break;
      case 1066: // Patchy snow possible
      case 1069: // Patchy sleet possible
      case 1072: // Patchy freezing drizzle possible
      case 1114: // Blowing snow
      case 1117: // Blizzard
      case 1150: // Patchy light drizzle
      case 1153: // Light drizzle
      case 1168: // Freezing drizzle
      case 1171: // Heavy freezing drizzle
      case 1198: // Light freezing rain
      case 1201: // Moderate or heavy freezing rain
      case 1204: // Light sleet
      case 1207: // Moderate or heavy sleet
      case 1210: // Patchy light snow
      case 1213: // Light snow
      case 1216: // Patchy moderate snow
      case 1219: // Moderate snow
      case 1222: // Patchy heavy snow
      case 1225: // Heavy snow
      case 1237: // Ice pellets
        backgroundColor = isNight ? "bg-[#ADB8CB70]" : "bg-[#ADB8CB]";
        color = "text-white";
        break;
      case 1063: // Patchy rain possible
      case 1180: // Patchy light rain
      case 1183: // Light rain
      case 1186: // Moderate rain at times
      case 1189: // Moderate rain
      case 1192: // Heavy rain at times
      case 1195: // Heavy rain
      case 1240: // Light rain shower
      case 1243: // Moderate or heavy rain shower
      case 1246: // Torrential rain shower
      case 1249: // Light sleet showers
      case 1252: // Moderate or heavy sleet showers
      case 1255: // Light snow showers
      case 1258: // Moderate or heavy snow showers
      case 1261: // Light showers of ice pellets
      case 1264: // Moderate or heavy showers of ice pellets
      case 1087: // Thundery outbreaks possible
      case 1273: // Patchy light rain with thunder
      case 1276: // Moderate or heavy rain with thunder
      case 1279: // Patchy light snow with thunder
      case 1282: // Moderate or heavy snow with thunder
        backgroundColor = "bg-[#1e3046]";
        color = "text-white";
        break;
      case 1285: // Patchy light snow with thunder
      case 1288: // Moderate or heavy snow with thunder
        backgroundColor = "bg-[#a594f9b3]";
        color = "text-white";
        break;
      default:
        backgroundColor = isNight ? "bg-[#233b52]" : "bg-[#c4e2ff]";
        color = isNight ? "text-white" : "text-[#24609b]";
        break;
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
                        const currentHourIndex = new Date(data?.location?.localtime).getHours();
                        const hoursArray = data?.forecast?.forecastday[0]?.hour || [];
                        const hourIndex = hoursArray.indexOf(hourdata);

                        if (hourIndex >= currentHourIndex) {
                        return(<SwiperSlide 
                        key={i}
                        className=''
                        style={{width:'25%',height:'auto'}}
                      >
                          <div className={`text-center rounded-lg p-2 w-[85px] ${hourIndex === currentHourIndex ? `${backgroundColor} ${color} [&>img]:invert [&>img]:brightness-0` : ''}`}>
                            <h5 className='text-sm font-medium capitalize mb-1'>{hourIndex === currentHourIndex ? 'Now' : new Date(hourdata.time).toLocaleTimeString('en-US', { hour: '2-digit', hour12: true })}</h5>
                            <img src={hourdata.condition.icon} className="text-center w-[50px] h-[50px] object-cover mx-auto" alt={hourdata.condition.text} />
                            <h4 className='font-semibold  text-md mt-1'>{hourdata.temp_c}°</h4>
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