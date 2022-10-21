import axios from 'axios'
const baseUrl = '/api/users'

// get all users

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getUser }