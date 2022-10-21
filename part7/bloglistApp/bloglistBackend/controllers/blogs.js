const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
const jwt = require('jsonwebtoken') // move this to middleware or don't
// const { findById } = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // remove this after moving to middleware and use token.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // token.id here

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const temporaryBlog = {
    title: savedBlog.title,
    id: savedBlog.id,
    author: savedBlog.author,
    url: savedBlog.url,
    likes: savedBlog.likes,
    user: { username: user.username, name: user.name, id: user.id }
  }

  response.status(201).json(temporaryBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  console.log(body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const newBlog = {
    comment: body.comment,
    user: user._id
  }
  console.log(newBlog)
  blog.comments.push(newBlog)

  const savedBlog = await blog.save()
  console.log(savedBlog)
  // const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  const user = request.user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (blog.user.id.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'invalid user' })
  }
  if (decodedToken.id.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    ulr: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter