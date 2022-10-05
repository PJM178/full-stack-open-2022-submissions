import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// get all blogs
const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

// delete a blog
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

// new blog entry
const newEntry = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// edit a blog
const updateBlog = async (id, blog, blogName) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  response.data.user = blogName.user
  return response.data
}

export default { getAll, newEntry, setToken, updateBlog, deleteBlog }