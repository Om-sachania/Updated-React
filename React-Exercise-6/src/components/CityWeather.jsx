import React,{ useState, useEffect}from 'react'
import { Link ,useLocation} from 'react-router-dom'
import ErrorPage from './ErrorPage';
import getWeatherData from '../api/getWeatherData';
import getForecastWeatherData from '../api/getForecastWeatherData';
import WeatherCard from './WeatherCard';
import CurrentWeather from './CurrentWeather';

const CityWeather = () => {
    const location = useLocation();
    const city = location.state.cityName;
    const [loading,setLoading] = useState(true);
    const [weatherData,setWeatherData] = useState([]);
    const [forecastWeather,setForecastWeather] = useState([]);
    const [error,setError] = useState(false);
    const [temp,setTemp] = useState(null);
    const [farenhit,setFarenhit] = useState(false);

    useEffect(()=>{
        if(city){
            const fetchWeatherData =async()=>{
                try {
                    const data = await getWeatherData(city);
                    if(data.cod === '404'){
                        setError(true);
                        throw new Error("Cannot Fetch the Data of the city");
                    }
                    setWeatherData(data);
                    setTemp(convertKelvinToCelcius(data.main.temp))
                } catch (error) {
                    console.log(error)
                }
                finally{
                    setLoading(false)
                }
            }
            fetchWeatherData();
        }
    },[city])

    useEffect(()=>{
        if(city){
            const fetchForecastWeatherData = async()=>{
                try {
                    const data = await getForecastWeatherData(city);
                    if(data.cod === '404'){
                        setError(true);
                        throw new Error("Cannot Fetch the Data of the city");
                    }
                    const filteredArrayOfForecastedData = data.list.filter((curData, index) => {
                        return index % 8 === 5;
                    });
                    setForecastWeather([...filteredArrayOfForecastedData]);
                } catch (error) {
                    console.log(error)
                }
            }
            fetchForecastWeatherData();
        }
    },[city])

    const convertKelvinToCelcius= (temp) =>(temp-273.15).toFixed(2)

    const convertToCelcius = ()=>{
        if (weatherData) {
            setTemp(((weatherData.main.temp - 273.15)).toFixed(2));
        }
        setFarenhit(false);
    }

    const convertToFarenhit = ()=>{
        if (weatherData) {
            setTemp(((weatherData.main.temp - 273.15) * 1.8 + 32).toFixed(2));
        }
        setFarenhit(true);
    }

    if(loading){
        return <h1>Loading.....</h1>
    }
    else if(error){
        return <ErrorPage/>
    }
    return (
        <>
            <div className={`cityWeatherDetails ${temp>25 ? 'tempHigh':'tempLow'}`} >
                <div className='headerPart'>
                    <h1>{weatherData.name}, {weatherData.sys.country}</h1>
                    <div className='tempBtn'>
                        <button className='celciusBtn' onClick={convertToCelcius}>°C</button>
                        <p>|</p>
                        <button className='farenhitBtn' onClick={convertToFarenhit}>F</button>
                    </div>
                </div>
                <CurrentWeather weatherData={weatherData} temprature = {temp} farenhit={farenhit}/>

                <div className='forecastedWeather'>
                    <div>
                        <h2>Forecast of 5 Days</h2>
                    <hr />
                    </div>
                    <div className='weatherDetails-cardContainer'>
                        {forecastWeather.map((data,index)=>(
                            <WeatherCard key={index} data={data} numberOfDays={index} farenhit={farenhit}/>
                        ))}
                    </div>
                </div>
                <Link to='/' className='goBackBtn'>Go Back</Link>
            </div>
        </>
    ) 
}

export default CityWeather
