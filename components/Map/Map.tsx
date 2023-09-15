import ReactDOMServer from 'react-dom/server';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup ,useMap,AttributionControl } from 'react-leaflet';
import CustomMarkerIcon from '@/components/Map/CustomMarkerIcon'; 
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Markers from './Markers';

const WeatherMap = () => {
  // const [weatherData, setWeatherData] = useState(null);
  
    // useEffect(() => {
    //   const city = 'London'; // Replace with the desired city or location.
    //   fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`)
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       setWeatherData(data);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching weather data:', error);
    //     });
    // }, []);
    function createCustomIcon(iconUrl: any, temperature: any) {
      const customIconContent = (
        <CustomMarkerIcon iconUrl={iconUrl} temperature={temperature} />
      );

      const htmlString = ReactDOMServer.renderToStaticMarkup(customIconContent);
    
      return new L.DivIcon({
        html: htmlString,
        className: 'custom-icon',
        iconSize: [40, 60], // Adjust the size as needed
      });
    }

  return (
    <div>
      <MapContainer style={{ height: '100vh', width: '100%' }} center={[33.5905, -7.6163]} minZoom={3} zoom={5} maxZoom={10} scrollWheelZoom={true} attributionControl={false}>
        <AttributionControl
          position="bottomright"
          prefix={`Developed by Me | &copy; <a href="https://github.com/NordineFR" target="_blank">NordineFR</a>`}
        />

        {/* <TileLayer
          url="https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=d277085ea6d54ed3bd64d999acfdb838"
        /> */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
