import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogRedux = [...useSelector(state => state.blogs)]
  const user = useSelector(state => state.user)
  console.log(user)

  blogRedux.sort((a, b) => a.likes - b.likes)
  blogRedux.reverse()
  console.log(blogRedux)

  // styling
  const blogStyle = {
    border: '2px solid',
    marginBottom: '5px',
    paddingTop: '5px'
  }

  return (
    <div>
      {blogRedux.map(blog =>
        <div style={blogStyle} className='blogContainer' key={blog.id}>
          <div style={{ marginLeft: '2px' }}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        </div>
      )}
    </div>
  )

  // version with more info toggle
  // return (
  //   <div>
  //     {blogRedux.map(blog =>
  //       <div style={blogStyle} className='blogContainer' key={blog.id}>

  //         <div style={{ marginLeft: '2px' }}>
  //           {/* <div className='blog'>
  //             {blog.title} {blog.author}
  //           </div> */}
  //           {/* <div style={hideWhenVisible} className='moreInfo'> */}
  //           <Link to={`/blogs/${blog.id}`}>
  //             <BlogInfoToggle title={blog.title} author={blog.author} buttonLabel={'view'}>
  //               <div>
  //                 <div>{blog.url}</div>
  //                 <div>likes {blog.likes} <button onClick={() => clickBlogUpdate(blog)} type='button' id='likeBlog'>like</button></div>
  //                 <div>{blog.user.name}</div>
  //                 {blog.user.username === user.username
  //                   ? <button onClick={() => window.confirm(`remove blog ${blog.title} by ${blog.author}?`) === true ? dispatch(removeBlog(blog.id)) : null} type='button' id='deleteBlogButton'>delete</button>
  //                   : null
  //                 }
  //               </div>
  //             </BlogInfoToggle>
  //           </Link>
  //           {/* </div> */}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )
}

export default Blogs