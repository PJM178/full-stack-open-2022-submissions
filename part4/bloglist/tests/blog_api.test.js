const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
// const { request } = require('../app')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

// user testing - start

describe('test users so', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salaisuus', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('that new users are able to be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rotta',
      name: 'Jorma Käyrä',
      password: 'kuiskaus',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('that username is unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Jorma Käyrä',
      password: 'kuiskaus',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('that username is not shorter than 3 symbols', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Jorma Käyrä',
      password: 'kuiskaus',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3).')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('that username must be given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Jorma Käyrä',
      password: 'kuiskaus',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('that password is not shorter than 3 symbols', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'robotti',
      name: 'Jorma Käyrä',
      password: 'ku',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toEqual('password is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

// user testing - end

test('blogs are returned as json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog post unique identifier is of the form "id"', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(content => {
    expect(content.id).toBeDefined()
  })
})

// test post requests with user validation - start

describe('test POST request so that', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }

    const passwordHash = await bcrypt.hash('salaisuus', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

  })

  test('new blogs are succesfully added to the database', async () => {
    const test = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salaisuus' })
      .expect(200)

    const token = test.body.token

    const newBlog = {
      title: 'testiblogi',
      author: 'testaaja testi',
      url: 'https//:testi.com',
      likes: 69
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('it fails if no token is provided', async () => {
    // const test = await api
    //   .post('/api/login')
    //   .send({ username: 'root', password: 'salaisuus' })
    //   .expect(200)

    // const token = test.body.token

    const newBlog = {
      title: 'testiblogi',
      author: 'testaaja testi',
      url: 'https//:testi.com',
      likes: 69
    }

    const result = await api
      .post('/api/blogs')
      // .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('missing like property defaults to 0', async () => {
    const test = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salaisuus' })
      .expect(200)

    const token = test.body.token

    const newBlog = {
      title: 'testiblogi',
      author: 'testaaja testi',
      url: 'https//:testi.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBeDefined()
  })

  test('missing title and url properties cause 400 Bad Request', async () => {
    const test = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salaisuus' })
      .expect(200)

    const token = test.body.token

    const newBlog = {
      author: 'testaaja testi',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

// test post requests with user validation - end

describe('deletion of a blog posting', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salaisuus', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const test = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salaisuus' })
      .expect(200)

    const token = test.body.token

    // for (let blog of helper.initialBlogs) {
    //   let blogObject = new Blog(blog)
    //   api
    //     .post('/api/blogs')
    //     .set('Authorization', `bearer ${token}`)
    //     .send(blogObject)
    //     .expect(201)
    //     .expect('Content-Type', /application\/json/)
    // }
    const newBlog = {
      title: 'testiblogi',
      author: 'testaaja testi',
      url: 'https//:testi.com',
      likes: 69
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('success with status code 204 if id is valid', async () => {
    const test = await api
      .post('/api/login')
      .send({ username: 'root', password: 'salaisuus' })
      .expect(200)

    const token = test.body.token

    const bloglistBegin = await helper.blogsInDb()
    const blogDelete = bloglistBegin[0]

    await api
      .delete(`/api/blogs/${blogDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const bloglistEnd = await helper.blogsInDb()

    expect(bloglistEnd).toHaveLength(bloglistBegin.length - 1)

    const titles = bloglistEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogDelete.title)
  })
})

describe('updating a blog post', () => {
  test('likes success', async () => {
    const bloglistBegin = await helper.blogsInDb()
    const blogUpdate = bloglistBegin[0]
    // const updatedLikes = blogUpdate.likes

    const updatedBlog = {
      likes: 699
    }

    await api
      .put(`/api/blogs/${blogUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const bloglistEnd = await helper.blogsInDb()

    expect(bloglistEnd[0].likes).toEqual(updatedBlog.likes)
  })
  test('author success', async () => {
    const bloglistBegin = await helper.blogsInDb()
    const blogUpdate = bloglistBegin[0]
    // const updatedLikes = blogUpdate.likes

    const updatedBlog = {
      author: 'Jortikka Sateenvarjo'
    }

    await api
      .put(`/api/blogs/${blogUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const bloglistEnd = await helper.blogsInDb()

    expect(bloglistEnd[0].author).toEqual(updatedBlog.author)
  })
})

afterAll(() => {
  mongoose.connection.close()
})