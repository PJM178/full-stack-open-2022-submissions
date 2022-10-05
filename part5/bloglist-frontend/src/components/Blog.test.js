import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  const blog = {
    id: '6336eeca37f656bcd1a6290f',
    title: 'testi front endista',
    author: 'Petri Tikka',
    url: 'https//:onneton.com',
    likes: 82,
    user: {
      username: 'petri',
      name: 'Petri Tikka',
      id: '633453ee529e30e8b7574427'
    },
  }

  const user = blog.user

  const { container } = render(<Blog blog={blog} user={user} blogUpdate={updateBlog} deleteBlog={deleteBlog}/>)

  // screen.debug()

  const div = container.querySelector('.blog')
  expect(div.innerHTML).toEqual(
    'testi front endista Petri Tikka <button type="button">view</button>'
  )
  const divMoreInfo = container.querySelector('.moreInfo')
  expect(divMoreInfo).toHaveStyle(
    'display: none;'
  )
})

test('url and likes are shown when the "view" button is cliked', async () => {
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  const userClicking = userEvent.setup()

  const blog = {
    id: '6336eeca37f656bcd1a6290f',
    title: 'testi front endista',
    author: 'Petri Tikka',
    url: 'https//:onneton.com',
    likes: 82,
    user: {
      username: 'petri',
      name: 'Petri Tikka',
      id: '633453ee529e30e8b7574427'
    },
  }

  const user = blog.user

  const { container } = render(<Blog blog={blog} user={user} blogUpdate={updateBlog} deleteBlog={deleteBlog}/>)

  const button = screen.getByText('view')
  await userClicking.click(button)

  const div = container.querySelector('.moreInfo')
  expect(div).toHaveStyle(
    'display: block;'
  )

  const elementUrl = screen.getByText('https//:onneton.com')
  const elementLikes = screen.getByText('likes 82')
  expect(elementUrl).toBeDefined()
  expect(elementLikes).toBeDefined()
})

test('like button receives the correct number of clicks (2)', async () => {
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  const userClicking = userEvent.setup()

  const blog = {
    id: '6336eeca37f656bcd1a6290f',
    title: 'testi front endista',
    author: 'Petri Tikka',
    url: 'https//:onneton.com',
    likes: 82,
    user: {
      username: 'petri',
      name: 'Petri Tikka',
      id: '633453ee529e30e8b7574427'
    },
  }

  const user = blog.user

  render(<Blog blog={blog} user={user} blogUpdate={updateBlog} deleteBlog={deleteBlog}/>)

  const button = screen.getByText('like')

  for (let i = 0; i < 2; i++) {
    await userClicking.click(button)
  }

  expect(updateBlog.mock.calls).toHaveLength(2)
})