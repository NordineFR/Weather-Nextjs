import { useState, useEffect } from "react";
import { TbMapPin, TbWind } from "react-icons/tb";
import { MdOutlineWaterDrop } from "react-icons/md";
import { PiDropBold } from "react-icons/pi";
import RenderLineChart from "@/components/RenderLineChart";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "@/app/loading";
import "swiper/css";
import "swiper/css/free-mode";

type Styles = {
  backgroundColor: string;
  color: string;
  backgroundImage: string;
};
interface Props<T> {
  data: T;
}

const GeneralWeather = ({ data }: Props<Record<string, any>>) => {
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState<Styles>({
    backgroundColor: "",
    color: "",
    backgroundImage: "",
  });

  const weatherStatus = data?.current?.condition?.code;
  const localHour = new Date(data?.location?.localtime).getHours();

  useEffect(() => {
    const fetchWeatherStyles = async () => {
      try {
        const weatherStyles = await getWeatherStyles(weatherStatus, localHour);
        const colorStyle = {
          backgroundColor: weatherStyles.backgroundColor,
          color: weatherStyles.color,
          backgroundImage: weatherStyles.backgroundImage,
        };
        setStyles(colorStyle);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error("Error fetching weather styles:", error);
      }
    };

    fetchWeatherStyles();
  }, []);

  const getWeatherStyles = async (
    weatherStatus: number,
    localHour: number
  ): Promise<Styles> => {
    // Simulate fetching styles asynchronously (replace with actual API call)
    return new Promise<Styles>((resolve) => {
      setTimeout(() => {
        let backgroundColor = "";
        let color = "";
        let backgroundImage = "";
        let isNight = false;
        if (localHour >= 21 || localHour < 6) {
          isNight = true;
          backgroundColor = "#0F1621";
          color = "white";
          backgroundImage = "url('/images/clouds.jpg')";
        }
        // weatherStatus = 1180;
        switch (weatherStatus) {
          case 1000: // Sunny
            backgroundColor = isNight ? "#0F1621" : "#ffd89e";
            color = isNight ? "white" : "#000000";
            backgroundImage = isNight
              ? "url('/images/clouds.jpg')"
              : "url('/images/sunny.jpg')";
            break;
          case 1003: // Partly cloudy
            backgroundColor = isNight ? "#0F1621" : "#c4e2ff";
            color = isNight ? "white" : "#24609b";
            backgroundImage = "url('/images/clouds.jpg')";
            break;
          case 1006: // Cloudy
          case 1009: // Overcast
            backgroundColor = isNight ? "#0F1621" : "#c4e2ff";
            color = isNight ? "white" : "#24609b";
            backgroundImage = "url('/images/overcast.jpg')";
            break;
          case 1135: // Fog
          case 1147: // Freezing fog
          case 1030: // Mist
            backgroundColor = isNight ? "#0F1621" : "#ADB8CB";
            color = "white";
            backgroundImage = "url('/images/mist.jpg')";
            break;
          // backgroundColor = isNight ? "#0F1621" : "#c4e2ff";
          // color = isNight ? "white" : "#24609b";
          // backgroundImage = "url('/images/overcast.jpg')";
          // break;
          case 1063: // Patchy rain possible
          case 1066: // Patchy snow possible
          case 1069: // Patchy sleet possible
          case 1072: // Patchy freezing drizzle possible
          case 1087: // Thundery outbreaks possible
            backgroundColor = isNight ? "#0F1621" : "#ADB8CB";
            color = "white";
            break;
          case 1114: // Blowing snow
          case 1117: // Blizzard
          case 1150: // Patchy light drizzle
          case 1153: // Light drizzle
          case 1168: // Freezing drizzle
          case 1171: // Heavy freezing drizzle
            backgroundColor = isNight ? "#0F1621" : "#ADB8CB";
            color = "white";
            backgroundImage = "url('/images/snow.jpg')";
            break;
          case 1180: // Patchy light rain
          case 1183: // Light rain
          case 1186: // Moderate rain at times
          case 1189: // Moderate rain
          case 1192: // Heavy rain at times
          case 1195: // Heavy rain
            backgroundColor = isNight ? "#0F1621" : "#1e3046";
            color = isNight ? "white" : "white";
            backgroundImage = "url('/images/rain.jpg')";
            break;
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
          case 1240: // Light rain shower
          case 1243: // Moderate or heavy rain shower
          case 1246: // Torrential rain shower
          case 1249: // Light sleet showers
          case 1252: // Moderate or heavy sleet showers
          case 1255: // Light snow showers
          case 1258: // Moderate or heavy snow showers
          case 1261: // Light showers of ice pellets
          case 1264: // Moderate or heavy showers of ice pellets
          case 1273: // Patchy light rain with thunder
          case 1276: // Moderate or heavy rain with thunder
          case 1279: // Patchy light snow with thunder
          case 1282: // Moderate or heavy snow with thunder
            backgroundColor = isNight ? "#0F1621" : "#c4e2ff";
            color = isNight ? "white" : "#24609b";
            break;
          default:
            backgroundColor = "#c4e2ff";
            color = "#24609b";
            backgroundImage = "url('/images/clouds.jpg')";
            break;
        }

        resolve({
          backgroundColor,
          color,
          backgroundImage,
        });
      }, 1000);
    });
  };
  if (loading) {
    return <Loading className="my-6 p-6 rounded-lg h-96 " />;
  }

  const formattedTime = data?.location?.localtime
    ? new Date(data.location.localtime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";
  //getting tempeture of each timeslot
  const hourlyData = data?.forecast?.forecastday[0]?.hour || [];
  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];
  const categorizedData = [];

  // Calculate the hours for each time slot
  const timeSlotsHours = [9, 13, 18, 22];

  for (let i = 0; i < timeSlotsHours.length; i++) {
    const targetHour = timeSlotsHours[i];
    const matchingHourData = hourlyData.find(
      (hourData: { time: string | number | Date }) => {
        const hour = new Date(hourData.time).getHours();
        return hour >= targetHour && hour < targetHour + 3;
      }
    );

    categorizedData.push({
      timeSlot: timeSlots[i],
      temperature: matchingHourData ? matchingHourData.temp_c : null,
    });
  }
  // end of timeslot
  return (
    <div
      className="my-6 p-6 rounded-lg lg:h-96 h-fit overflow-hidden relative z-10"
      style={{ backgroundColor: styles.backgroundColor, color: styles.color }}
    >
      <div
        className="absolute inset-0 opacity-100 bg-cover mix-blend-soft-light"
        style={{ backgroundImage: styles.backgroundImage }}
      />
      <div className="flex lg:flex-row flex-col justify-center items-center gap-8 h-full ">
        <div className="lg:w-1/2 w-full h-full flex flex-col justify-between items-center">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row justify-start items-center ">
              <TbMapPin className="mr-2 text-2xl" />
              <span className="font-semibold text-xl">
                {data?.location?.name}
              </span>
            </div>
            <div>Today {formattedTime}</div>
          </div>
          <div className="flex flex-col justify-center text-center my-8">
            <div className="flex flex-row justify-center items-center mr-[-20px]">
              <h1 className="text-9xl text-bold">{data?.current?.temp_c}</h1>
              <span className="h-full text-[80px] mt-[-60px]">°</span>
            </div>
            <h4 className="capitalize font-medium">
              {data?.current?.condition?.text}
            </h4>
          </div>
          <div className="flex flex-row justify-between items-center  w-full">
            <div className="flex flex-row justify-start items-center">
              <TbWind className="mr-2 text-xl" />
              <span className="font-medium">
                {data?.current?.pressure_mb}hpa
              </span>
            </div>
            <div className="flex flex-row justify-start items-center">
              <PiDropBold className="mr-2 text-xl" />
              <span className="font-medium">{data?.current?.humidity}%</span>
            </div>
            <div className="flex flex-row justify-start items-center">
              <TbMapPin className="mr-2 text-xl" />
              <span className="font-medium">{data?.current?.wind_kph}km/h</span>
            </div>
          </div>
        </div>

        <div className="bg-white lg:w-1/2 w-full h-full p-6 rounded-lg backdrop-opacity-60 bg-opacity-40 flex flex-col justify-between items-center">
          <h3 className="mb-4 w-full text-xl font-semibold">Temperature</h3>
          <div className="py-6  w-full">
            <RenderLineChart color={styles.color} data={categorizedData} />
          </div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={0}
            freeMode={true}
            centeredSlides
            centeredSlidesBounds
            className="mt-4 w-full"
          >
            <div className="flex flex-row flex-nowrap justify-around items-center text-center gap-8 w-full">
              {categorizedData.map((timeSlotData, i) => (
                <SwiperSlide
                  key={i}
                  className=""
                  style={{ width: "25%", height: "auto" }}
                >
                  <div className="text-center">
                    <h5 className="text-sm capitalize">
                      {timeSlotData.timeSlot}
                    </h5>
                    <h4 className="font-semibold py-2">
                      {timeSlotData.temperature}°
                    </h4>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GeneralWeather;
