import ReactDOMServer from 'react-dom/server';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup ,useMap} from 'react-leaflet';
import CustomMarkerIcon from '@/components/Map/CustomMarkerIcon'; 
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Props<T> {
  weatherData?:T;
}

const Markers = ({ weatherData }:Props<Record<string, any>>) => {
  const [closeWeatherData, setCloseWeatherData] = useState(null);
  const [visibleBounds, setVisibleBounds] = useState(null);
  const map = useMap();

  // useEffect(() => {
  //   // Update visible bounds when the map view changes
  //   map.on('moveend', () => {
  //     setVisibleBounds(map.getBounds());
  //   });
  // }, [map]);

  //  useEffect(() => {
  //   if (!visibleBounds) return;

  //   // Calculate a bounding box around the visible bounds (you can adjust the buffer as needed)
  //   const buffer = 0.2; // Adjust the buffer distance
  //   const bounds = visibleBounds.pad(buffer);
  //   const zoom = map.getZoom();
  //   // Fetch weather data for cities within the bounding box
  //   fetchCitiesWeather(bounds,zoom).then((data: any) => {
  //     setCloseWeatherData(data);
  //   });
  //   }, [visibleBounds]);

  // function fetchCitiesWeather (bounds: any, zoom: number){
  //   console.log(bounds);
  // }

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
    <>
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
    </>
  )
}

export default Markers