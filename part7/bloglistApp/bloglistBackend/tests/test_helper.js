const User = require('../models/user')
const blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Oravanpyörä ei pyöri',
    author: 'Kalle Kallela',
    url: 'https//:gmail.com',
    likes: 12,
  },
  {
    title: 'Suuri Laama Huomattu',
    author: 'Jorma Käyrä',
    url: 'https//:ei-sitten',
    likes: 20,
  }
]

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, blogsInDb, usersInDb
}