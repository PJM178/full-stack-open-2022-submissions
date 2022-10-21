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

// get one blog
const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
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

const newComment = async (newComment) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(newComment.comment)
  const comment = {
    comment: newComment.comment
  }
  const response = await axios.post(`${baseUrl}/${newComment.blog.id}/comments`, comment, config)
  return response.data
}

// edit a blog
const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

export default { getAll, newEntry, setToken, updateBlog, deleteBlog, newComment, getBlog }