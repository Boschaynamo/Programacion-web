import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'



const ShowCountry = ({ country }) => {
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY
    //obtener datos de la api openweather
    useEffect(() => { 
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
          .then(response => {
            setWeather(response.data)
          })
    },
        [country,api_key])
    
    console.log(country.capital)
    console.log(weather);
    return (
        Object.keys(weather).length === 0 ? 'loading' :
        <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>Capital:{country.capital}</p>
            <p>Area:{country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((Language) => {
                    return (<li key={Language}>  {Language}</li>)
                })}
            </ul>
            <h2>Flag</h2>
            <img src={country.flags.svg} alt='No hay bandera' />
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp-273}°C</p>
            {<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='No encontre' />}
            <p>Wind {weather.wind.speed}</p>
        </div>
    )
}

export default ShowCountry