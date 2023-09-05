import { MapContainer, Marker, TileLayer, useMap,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <MapContainer style={{height:"100vh",}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map


// dynamic weather details 
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

// const WeatherMap = () => {
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     const city = 'London'; // Replace with the desired city or location.

//     fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setWeatherData(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching weather data:', error);
//       });
//     }, []);

//   return (
//     <div>
//       <MapContainer style={{ height: '100vh' }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {weatherData && (
//           <Marker position={[weatherData.location.lat, weatherData.location.lon]}>
//             <Popup>
//               <div>
//                 <strong>{weatherData.location.name}, {weatherData.location.country}</strong><br />
//                 Temperature: {weatherData.current.temp_c}°C<br />
//                 Weather: {weatherData.current.condition.text}
//               </div>
//             </Popup>
//           </Marker>
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default WeatherMap;
