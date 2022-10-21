import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const findCountry = async (name) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      setCountry(response.data[0])
    } catch (error) {
      setCountry('')
    }
  }

  useEffect(() => {
    if (name !== '') {
      findCountry(name)
    }
  }, [name])

  return country
}