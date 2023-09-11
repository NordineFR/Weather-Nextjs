import ReactDOMServer from 'react-dom/server';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup ,useMap} from 'react-leaflet';
import CustomMarkerIcon from '@/components/Map/CustomMarkerIcon'; 
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Markers = () => {
  const [closeWeatherData, setCloseWeatherData] = useState<any[]>([]);
  const [visibleBounds, setVisibleBounds] = useState(null);
  const map = useMap();

  useEffect(() => {
    // Update visible bounds when the map view changes
    map.on('moveend', () => {
      if(map.getZoom() >= 9){
        setVisibleBounds(map.getBounds());
      }
    });
  }, [map]);
  
  useEffect(() => {
    if (!visibleBounds) return;
    
    // Calculate a bounding box around the visible bounds (you can adjust the buffer as needed)
    const buffer = 0.2; // Adjust the buffer distance
    const bounds = visibleBounds.pad(buffer);
    const zoom = map.getZoom();
    // Fetch weather data for cities within the bounding box
    fetchCitiesWeather(bounds,zoom).then((data: any) => {
      setCloseWeatherData(data.list);
      Array.isArray(data.list) ?setCloseWeatherData(data.list) : console.error('Invalid data structure received:', data);
    });
    }, [visibleBounds]);

  function fetchCitiesWeather (bounds: any, zoom: number){
    const maxAllowedArea = 25.00;
    const lat1 = bounds._southWest.lat;
    const lat2 = bounds._northEast.lat;
    const lng1 = bounds._southWest.lng;
    const lng2 = bounds._northEast.lng;

    const areaSquareDegrees = Math.abs(lat2 - lat1) * Math.abs(lng2 - lng1);

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

    const bbox = `${adjustedLng1},${adjustedLat1},${adjustedLng2},${adjustedLat2},${zoom}`;
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
      {Array.isArray(closeWeatherData) &&
        closeWeatherData.map((cityData: any) => (
          <Marker
            key={cityData.id} // You should use a unique key here
            position={[cityData.coord.Lat, cityData.coord.Lon]}
            icon={createCustomIcon(cityData.weather[0].icon, cityData.main.temp)}
          >
            <Popup>
              <div>
                <img src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`} alt="Weather icon" className='text-center mx-auto '/>
                <strong>
                  {cityData.name}
                </strong>
                <br />
                Temperature: {cityData.main.temp}°C
                <br />
                Weather: {cityData.weather[0].description}
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  )
}

export default Markers