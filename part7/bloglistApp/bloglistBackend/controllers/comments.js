const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment
    .find({ blog: request.params.id })
    // .populate('blog', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const user = request.user
  console.log(request.user)
  console.log(request.params.id)
  console.log(request.body)

  const comment = new Comment({
    text: body.text,
    user: user,
    blog: request.params.id
  })

  const savedComment = await comment.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter