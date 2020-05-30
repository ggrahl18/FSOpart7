const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!(body.password.length > 2 && body.password)) {
      return response.status(400)
        .json({ error: 'password should be at least 3 char long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const searchedUser = await User.findById(request.params.id)
    if (searchedUser) {
      response.json(searchedUser.toJSON())
    } else {
      response.status(204).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter