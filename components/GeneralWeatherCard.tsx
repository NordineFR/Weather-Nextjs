import { useState, useEffect } from 'react';

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
        backgroundColor: '#9FC7F6', // Hexcode for blue color
        color: 'white' // Set the text color for sunny
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
    <div className="my-6 p-6 rounded-lg h-96" style={styles}>
      GeneralWeather
    </div>
  );
}

export default GeneralWeather