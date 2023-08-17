import { useState, useEffect } from 'react';
import {TbMapPin,TbWind} from 'react-icons/tb';
import {MdOutlineWaterDrop} from 'react-icons/md';
import {PiDropBold} from 'react-icons/pi';
import RenderLineChart from '@/components/RenderLineChart';
import { Swiper,SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';

type Styles = {
  backgroundColor: string;
  color: string;
};


const GeneralWeather = () => {
  const [styles, setStyles] = useState<Styles>({
    backgroundColor: '',
    color: ''
  });

  const weatherStatus = 'sunny';

  useEffect(() => {
    const weatherStyles = getWeatherStyles(weatherStatus);
    setStyles(weatherStyles);
  }, []);

  const getWeatherStyles = (weatherStatus: string): Styles => {
    if (weatherStatus === 'sunny') {
      return {
        backgroundColor: '#c4e2ff', // Hexcode for blue color
        color: '#24609b' // Set the text color for sunny
      };
    } else if (weatherStatus === 'cloudy') {
      return {
        backgroundColor: '#0F1621', // Hexcode for dark gray color
        color: 'white' // Set the text color for cloudy
      };
    }
    // Add more conditions for other weather statuses and styles
    return {
      backgroundColor: '',
      color: ''
    };
  };

  return (
    <div className="my-6 p-6 rounded-lg lg:h-96 h-fit overflow-hidden relative z-10" style={styles}>
       <div
        className="absolute inset-0 opacity-20" // Overlay with low opacity background
        style={{
          backgroundImage: "url('/images/clouds.jpg')", // Replace with your image URL
          backgroundSize: 'cover',
        }}
      />
      <div className='flex lg:flex-row flex-col justify-center items-center gap-8 h-full '>
          <div className='lg:w-1/2 w-full h-full flex flex-col justify-between items-center'>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row justify-start items-center '><TbMapPin className="mr-2 text-2xl" /><span className='font-semibold text-xl'>Gotham</span></div>
              <div>Today 00:32 PM</div>
            </div>
            <div className='flex flex-col justify-center text-center my-8'>
              <div className='flex flex-row justify-center items-center mr-[-20px]'>
                <h1 className='text-9xl text-bold'>14</h1><span className='h-full text-[80px] mt-[-60px]'>°</span>
              </div>
              <h4 className='capitalize font-medium'>Mostly Clear</h4>
            </div>
            <div className='flex flex-row justify-between items-center  w-full'>
              <div className='flex flex-row justify-start items-center'><TbWind className="mr-2 text-xl" /><span className='font-medium'>720hpa</span></div>
              <div className='flex flex-row justify-start items-center'><PiDropBold className="mr-2 text-xl" /><span className='font-medium'>32%</span></div>
              <div className='flex flex-row justify-start items-center'><TbMapPin className="mr-2 text-xl" /><span className='font-medium'>12km/h</span></div>
            </div>
          </div>

          <div className='bg-white lg:w-1/2 w-full h-full p-6 rounded-lg backdrop-opacity-60 bg-opacity-40 flex flex-col justify-between items-center'>
            <h3 className='mb-4 w-full text-xl font-semibold'>Temperature</h3>
            <div className='py-6  w-full'>
              <RenderLineChart color={styles.color} />
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
                      (['Morning','Afternon','evening','night']).map((status,i)=>(
                        <SwiperSlide 
                        key={i}
                        className=''
                        style={{width:'25%',height:'auto'}}
                    >
                          <div className='text-center' >
                            <h5 className='text-sm capitalize'>{status}</h5>
                            <h4 className='font-semibold py-2'>{15+i}°</h4>
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