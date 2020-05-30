const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const searchedBlog = await Blog.findById(request.params.id)
    if (searchedBlog) {
      response.json(searchedBlog.toJSON())
    } else {
      response.status(204).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
  try {
    const searchedBlog = await Blog.findById(request.params.id)
    if (searchedBlog) {
      response.json(searchedBlog.toJSON())
    } else {
      response.status(204).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const body = request.body

  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: blog.comments.concat(body.comment),
  }

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)

  } catch (exception) {
    next(exception)
  }

})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      user: user._id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      comments: [],
    })

    const savedBlog = await blog.save()
    console.log('saved blog', savedBlog)
    await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())

  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(blog.user.toString())

    if (user._id.toString() === blog.user.toString()) {
      await blog.remove()
    }
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    await updatedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
    response.json(updatedBlog.toJSON())

  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
