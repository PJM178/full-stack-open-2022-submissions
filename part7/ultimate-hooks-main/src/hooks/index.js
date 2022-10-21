import { useState, useEffect } from 'react'
import axios from 'axios'


export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async (baseUrl) => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }
  
  useEffect(() => {
    getAll(baseUrl)
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data]) 
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset: {reset}
  }
}