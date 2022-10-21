import { useState } from 'react'

const BlogInfoToggle = (props) => {
  const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    clear: 'both'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={{ float: 'inline' }}>
        {props.title} {props.author} <button onClick={toggleVisibility}>{visible === false ? props.buttonLabel : 'hide'}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </>
  )
}

BlogInfoToggle.displayName = 'Togglable'

export default BlogInfoToggle