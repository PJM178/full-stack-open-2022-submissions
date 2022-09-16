import { useEffect, useState } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState([])
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countries = response.data
        setCountries(countries)
        })
  }, [])

  const getWeatherData = (lat, lon, api_key) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        const weatherData = response.data
        setWeather(weatherData)
      })
  }

  const handleInputChange = (event) => {
    const target = event.target
    setQuery(target.value)
    setCountry([])
  }

  const countryName = (value) => {
      const name = countries.filter(country => country.name.common.toLowerCase() === value.toLowerCase())
      setCountry(country.concat(name))
  }

  const filteredCountries = (value) => value.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <Filter value={query} function={handleInputChange} />
      <Countries api_key={api_key} weatherData={getWeatherData} weather={weather} countries={filteredCountries(countries)} filter={query} name={countryName} showCountry={country} />
    </div>
  );
}

export default App;
