const getWeatherData = async(city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2969d913cc9a19036a7952ceef2c06ac`)
    const data = response.json();
    return data
}

export default getWeatherData