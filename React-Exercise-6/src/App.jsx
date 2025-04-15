import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import WeatherDashBoard from './components/WeatherDashBoard'
import CityWeather from './components/CityWeather';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WeatherDashBoard/>}/>
        <Route path='/city' element={<CityWeather/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App