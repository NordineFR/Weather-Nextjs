import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

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


    function createCustomIcon(iconUrl) {
      const customIconDiv = document.createElement('div');
      customIconDiv.style.background = 'lightgray'; // Background color
      customIconDiv.style.width = '40px'; // Width
      customIconDiv.style.height = '40px'; // Height
      customIconDiv.style.display = 'flex';
      customIconDiv.style.justifyContent = 'center';
      customIconDiv.style.alignItems = 'center';

      const img = document.createElement('img');
      img.src = iconUrl;
      img.style.maxWidth = '80%'; // Adjust the max width as needed
      img.style.maxHeight = '80%'; // Adjust the max height as needed

      customIconDiv.appendChild(img);

      return new L.DivIcon({
        html: customIconDiv,
        className: 'custom-icon',
        iconSize: [40, 40], // Adjust the size as needed
      });
    }
  return (
    <div>
      <MapContainer style={{ height: '100vh', width: '100%' }} center={[51.505, -0.09]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {weatherData && (
          <Marker position={[weatherData?.location?.lat, weatherData?.location?.lon]} icon={createCustomIcon(weatherData?.current?.condition.icon)}>
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
