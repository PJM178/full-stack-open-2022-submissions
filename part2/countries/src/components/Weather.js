import React, { useEffect } from "react";

const Weather = (props) => {
    useEffect(() => {
        props.weatherData(props.country.latlng[0], props.country.latlng[1], props.api_key)
    }, [])
    
    if (props.weather.length === 0) {
        return(
            <div>Loading...</div>
        )
    }
    else {
        return (
        <div>
            <h2>Weather in {props.country.name.common}</h2>
            <div>Temperature: {props.weather.main.temp} Celsius</div>
            <img alt="icon" src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}/>
            <div>Wind: {props.weather.wind.speed} m/s</div>
        </div>
        )
    }
    }

export default Weather