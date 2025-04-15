import React from 'react';
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";
import getWeatherImage from '../assets/getWeatherImage';

const CurrentWeather = ({weatherData,farenhit,temprature}) => {
    return (
        <div className='currentWeatherDetails'>
            <img src={getWeatherImage(weatherData.weather[0].icon)} alt="" />
            <div className='weatherType'>
                <h3>{weatherData.weather[0].main}</h3>
                <h2>{temprature}{farenhit?'F':<TbTemperatureCelsius />}</h2>
            </div>
            <div className='weather-info'>
                <p><FaTemperatureLow /> Temperature : {temprature} </p>
                <p><WiHumidity /> Humidity : {weatherData.main.humidity}%</p>
                <p><GiWindSlap /> Wind Speed : {weatherData.wind.speed}m/s</p>
            </div>
        </div>
    )
}

export default CurrentWeather