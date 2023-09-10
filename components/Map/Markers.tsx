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

  useEffect(() => {
    // Update visible bounds when the map view changes
    map.on('moveend', () => {
      setVisibleBounds(map.getBounds());
    });
  }, [map]);
  
  useEffect(() => {
    if (!visibleBounds) return;
    
    // Calculate a bounding box around the visible bounds (you can adjust the buffer as needed)
    const buffer = 0.2; // Adjust the buffer distance
    const bounds = visibleBounds.pad(buffer);
    const zoom = map.getZoom();
    console.log(bounds);
    // Fetch weather data for cities within the bounding box
    fetchCitiesWeather(bounds,zoom).then((data: any) => {
      setCloseWeatherData(data);
    });
    }, [visibleBounds]);

  function fetchCitiesWeather (bounds: any, zoom: number){
    const maxAllowedArea = 25.00;
    const lat1 = bounds.getSouth();
    const lat2 = bounds.getNorth();
    const lng1 = bounds.getWest();
    const lng2 = bounds.getEast();

    const areaSquareDegrees = Math.abs(lat2 - lat1) * Math.abs(lng2 - lng1);
    console.log('Bounding Box Area (Square Degrees):', areaSquareDegrees);

    let adjustedLat1 = lat1;
    let adjustedLat2 = lat2;
    let adjustedLng1 = lng1;
    let adjustedLng2 = lng2;

    if (areaSquareDegrees > maxAllowedArea) {
      const allowedArea = maxAllowedArea;
      const adjustedAreaRatio = Math.sqrt(allowedArea / areaSquareDegrees);
      adjustedLat1 = lat1 + (lat2 - lat1) * (1 - adjustedAreaRatio) / 2;
      adjustedLat2 = lat2 - (lat2 - lat1) * (1 - adjustedAreaRatio) / 2;
      adjustedLng1 = lng1 + (lng2 - lng1) * (1 - adjustedAreaRatio) / 2;
      adjustedLng2 = lng2 - (lng2 - lng1) * (1 - adjustedAreaRatio) / 2;

      const areaSquareDegrees1 = Math.abs(adjustedLat2 - adjustedLat1) * Math.abs(adjustedLng2 - adjustedLng1);
      console.log('Bounding Box Area (Square Degrees):', areaSquareDegrees1);
    }

    const bbox = `${adjustedLat1},${adjustedLat2},${adjustedLng1},${adjustedLng2},${zoom}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/box/city?bbox=${bbox}&appid=${process.env.NEXT_PUBLIC_WEATHER_MAP_API_KEY}`;


    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          resolve(data); // Resolve the Promise with the data
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          reject(error); // Reject the Promise with the error
        });
    });
  }

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