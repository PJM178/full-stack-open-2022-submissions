import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm correct details when submitted', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={addBlog} />)

  screen.debug()

  const inputTitle = container.querySelector('#formTitle')
  const inputAuthor = container.querySelector('#formAuthor')
  const inputUrl = container.querySelector('#formUrl')

  const sendButton = screen.getByText('submit')

  await user.type(inputTitle, 'testing title')
  await user.type(inputAuthor, 'testing author')
  await user.type(inputUrl, 'testing url')

  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls[0][0])
  expect(addBlog.mock.calls[0][0].title).toBe('testing title')
  expect(addBlog.mock.calls[0][0].author).toBe('testing author')
  expect(addBlog.mock.calls[0][0].url).toBe('testing url')
})