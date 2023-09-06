import ReactDOMServer from 'react-dom/server';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import CustomMarkerIcon from '@/components/Map/CustomMarkerIcon'; 
import 'leaflet/dist/leaflet.css';

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const city = 'London'; // Replace with the desired city or location.

    fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
    }, []);

    function renderCustomIconToHTML(iconUrl, temperature) {
      const customIconContent = (
        <CustomMarkerIcon iconUrl={iconUrl} temperature={temperature} />
      );
    
      const htmlString = ReactDOMServer.renderToStaticMarkup(customIconContent);
    
      return htmlString;
    }
    function createCustomIcon(iconUrl, temperature) {
      const customIconHTML = renderCustomIconToHTML(iconUrl, temperature);
    
      return new L.DivIcon({
        html: customIconHTML,
        className: 'custom-icon',
        iconSize: [40, 60], // Adjust the size as needed
      });
    }

  return (
    <div>
      <MapContainer style={{ height: '100vh', width: '100%' }} center={[51.505, -0.09]} minZoom={3} zoom={7} maxZoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {weatherData && (
          <Marker position={[weatherData?.location?.lat, weatherData?.location?.lon]} icon={createCustomIcon(weatherData?.current?.condition.icon,weatherData?.current?.temp_c)} >
            <Popup>
              <div>
                <strong>{weatherData?.location?.name}, {weatherData?.location?.country}</strong><br />
                Temperature: {weatherData?.current?.temp_c}°C<br />
                Weather: {weatherData?.current?.condition.text}
                <img src="" />
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
