import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './WeatherApp.css';

const WeatherDashBoard = () => {
    const [city,setCity] = useState('');

    const handleOnChange =(e)=>{
        setCity(()=>e.target.value);
    }

    const handleAlert = ()=>{
        if(city.trim()==''){
            alert('Enter City Name');
            return
        }
    }

    return(
        <>
        <div className='container'>
            <h1>Weather Application</h1>
            <p>Get Weather Details of your city</p>
            <div>
                <input type="text" placeholder='Search City' value={city} onChange={handleOnChange} className='inputField'/>
                <Link to={city.trim()===''?'/' : '/city'} 
                className='searchBtn' 
                onClick={handleAlert}
                state={{cityName : city}}
                >
                    Search
                </Link>
            </div>
        </div>
        </>
    )
}

export default WeatherDashBoard