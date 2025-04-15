import React from 'react'
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";

const WeatherCard = ({data,numberOfDays,farenhit}) => {
    const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
    const kelvinToFahrenheit = (temp) => ((temp - 273.15) * 1.8 + 32).toFixed(2);

    const temperature = farenhit 
        ? kelvinToFahrenheit(data.main.temp) 
        : kelvinToCelsius(data.main.temp);
    return (
        <div className='weatherCard'>
            <h3>Day {numberOfDays+1}</h3>
            <ul>
                <li><FaTemperatureLow />Temperature : {temperature}{farenhit?'F':'°C'}</li>
                <li><WiHumidity />Humidity : {data.main.humidity}%</li>
                <li><GiWindSlap />Wind Speed : {data.wind.speed}m/s</li>
            </ul>
        </div>
    )
}

export default WeatherCard