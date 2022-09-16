import React, { useEffect } from 'react'
import Weather from './Weather'

const Country = (props) => {
    const {weatherData} = props
    const {country} = props
    const {api_key} = props
    const {weather} = props
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map(language => {
                    return (
                        <li key={language}>{language}</li>
                    )
                })} 
            </ul>
            <img alt="flag" src={country.flags.png}/>
            <Weather api_key={api_key} weather={weather} weatherData={weatherData} country={country} />
        </div>
    )
}

export default Country