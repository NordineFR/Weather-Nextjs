import { useState, useEffect } from 'react';
import {TbMapPin,TbWind} from 'react-icons/tb';
import {MdOutlineWaterDrop} from 'react-icons/md';
import {PiDropBold} from 'react-icons/pi';
import RenderLineChart from '@/components/RenderLineChart';
import { Swiper,SwiperSlide } from 'swiper/react';
import Loading from '@/app/loading';
import 'swiper/css';
import 'swiper/css/free-mode';

type Styles = {
  backgroundColor: string;
  color: string;
};
interface Props<T> {
  data: T;
}

  const GeneralWeather = ({data}:Props<Record<string, any>>) => {
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState<Styles>({
    backgroundColor: '',
    color: ''
  });

  const weatherStatus = data?.current?.condition?.text.toLowerCase();

  useEffect(() => {
    const fetchWeatherStyles = async () => {
      try {
        const weatherStyles = await getWeatherStyles(weatherStatus);
        setStyles(weatherStyles);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error('Error fetching weather styles:', error);
      }
    };

    fetchWeatherStyles();
  }, []);

  const getWeatherStyles = async (weatherStatus: string): Promise<Styles> => {
    // Simulate fetching styles asynchronously (replace with actual API call)
    return new Promise<Styles>((resolve) => {
      setTimeout(() => {
        let backgroundColor = '';
        let color = '';
        switch (true) {
          case /sunny|clear/.test(weatherStatus):
            backgroundColor = '#c4e2ff';
            color = '#24609b';
          break;
          case /cloudy/.test(weatherStatus):
          case /windy/.test(weatherStatus):
          case /rainy/.test(weatherStatus):
          case /stormy/.test(weatherStatus):
            backgroundColor = '#0F1621';
            color = 'white';
          break;
          default:
            resolve({
              backgroundColor: '',
              color: '',
            });
            break;
        }
        resolve({
          backgroundColor,
          color,
        });
      }, 1000); 
    });
  };
  if (loading) {
    return <Loading className="my-6 p-6 rounded-lg h-96 " />;
  }

  const formattedTime = data?.location?.localtime ? new Date(data.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '';
  //getting tempeture of each timeslot
  const hourlyData = data?.forecast?.forecastday[0]?.hour || [];
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const categorizedData = [];

  // Calculate the hours for each time slot
  const timeSlotsHours = [9, 13, 18, 22];

  for (let i = 0; i < timeSlotsHours.length; i++) {
    const targetHour = timeSlotsHours[i];
    const matchingHourData = hourlyData.find((hourData: { time: string | number | Date; }) => {
      const hour = new Date(hourData.time).getHours();
      return hour >= targetHour && hour < targetHour + 3;
    });

    categorizedData.push({
      timeSlot: timeSlots[i],
      temperature: matchingHourData ? matchingHourData.temp_c : null,
    });
  }
  // end of timeslot
  return (
    <div className="my-6 p-6 rounded-lg lg:h-96 h-fit overflow-hidden relative z-10" style={styles}>
       <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/clouds.jpg')", 
          backgroundSize: 'cover',
        }}
      />
      <div className='flex lg:flex-row flex-col justify-center items-center gap-8 h-full '>
          <div className='lg:w-1/2 w-full h-full flex flex-col justify-between items-center'>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row justify-start items-center '><TbMapPin className="mr-2 text-2xl" /><span className='font-semibold text-xl'>{data?.location?.name}</span></div>
              <div>Today {formattedTime}</div>
            </div>
            <div className='flex flex-col justify-center text-center my-8'>
              <div className='flex flex-row justify-center items-center mr-[-20px]'>
                <h1 className='text-9xl text-bold'>{data?.current?.temp_c}</h1><span className='h-full text-[80px] mt-[-60px]'>°</span>
              </div>
              <h4 className='capitalize font-medium'>{data?.current?.condition?.text}</h4>
            </div>
            <div className='flex flex-row justify-between items-center  w-full'>
              <div className='flex flex-row justify-start items-center'><TbWind className="mr-2 text-xl" /><span className='font-medium'>{data?.current?.pressure_mb}hpa</span></div>
              <div className='flex flex-row justify-start items-center'><PiDropBold className="mr-2 text-xl" /><span className='font-medium'>{data?.current?.humidity}%</span></div>
              <div className='flex flex-row justify-start items-center'><TbMapPin className="mr-2 text-xl" /><span className='font-medium'>{data?.current?.wind_kph}km/h</span></div>
            </div>
          </div>

          <div className='bg-white lg:w-1/2 w-full h-full p-6 rounded-lg backdrop-opacity-60 bg-opacity-40 flex flex-col justify-between items-center'>
            <h3 className='mb-4 w-full text-xl font-semibold'>Temperature</h3>
            <div className='py-6  w-full'>
              <RenderLineChart color={styles.color} data={categorizedData}/>
            </div>
              <Swiper 
                slidesPerView="auto"
                spaceBetween={0}
                freeMode={true}
                centeredSlides
                centeredSlidesBounds
                className='mt-4 w-full'
                >
                <div className='flex flex-row flex-nowrap justify-around items-center text-center gap-8 w-full'>
                {   
                      (categorizedData).map((timeSlotData,i)=>(
                        <SwiperSlide 
                        key={i}
                        className=''
                        style={{width:'25%',height:'auto'}}
                    >
                          <div className='text-center' >
                            <h5 className='text-sm capitalize'>{timeSlotData.timeSlot}</h5>
                            <h4 className='font-semibold py-2'>{timeSlotData.temperature}°</h4>
                          </div>
                      </SwiperSlide>
                      ))
                }
                    </div>
                
              </Swiper>
                
          </div>
      </div>
    </div>
  );
}

export default GeneralWeather