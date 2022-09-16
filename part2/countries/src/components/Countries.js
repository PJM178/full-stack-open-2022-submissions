import React, { useEffect } from 'react'
import Item from './Item'
import Country from './Country'

const Countries = ({countries, filter, name, showCountry, weather, weatherData, api_key}) => {
    const country = countries[0]
    if (filter.length === 0) {
        return (
            <div>Type something to search countries</div>
        )
    }
    else if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    else if (countries.length === 1) {
        return (
            <Country country={country} weather={weather} weatherData={weatherData} api_key={api_key}/>
        )
    }
    else if (showCountry.length === 1) {
        return (
            <Country country={showCountry[0]} weather={weather} weatherData={weatherData} api_key={api_key}/>
        )
    }
    else {
        return (
            <ul>
                {countries.map(country =>
                    <Item key={country.cca3} item={country.name.common} name={name} />
                )}
            </ul>
        )
    }
}

export default Countries