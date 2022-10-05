const dummy = (blogs) => {

  return blogs.length === 0
    ? 1
    : 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const mappedBlog = blogs.map(value => value.likes)
  const maxValue = Math.max(...mappedBlog)
  const maxIndex = mappedBlog.indexOf(maxValue)
  return blogs[maxIndex]
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(author => author.author)
  const authorList = authors.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? acc[val] = 1 : acc[val] += 1
    return acc
  }, {})
  const maxBlogs = []
  for (const [key, value] of Object.entries(authorList)) {
    const obj = { author: key, blogs: value }
    maxBlogs.push(obj)
  }
  const mappedBlog = maxBlogs.map(value => value.blogs)
  const maxValue = Math.max(...mappedBlog)
  const maxIndex = mappedBlog.indexOf(maxValue)
  return maxBlogs[maxIndex]
}

const mostLikes = (blogs) => {
  const authors = blogs.map(author => author.author)
  const likes = blogs.map(value => value.likes)
  const uniqueAuthors = [... new Set(blogs.map(item => item.author))]
  const authorList = []
  for (let i = 0; i < blogs.length; i++) {
    const obj = { author: authors[i], likes: likes[i] }
    authorList.push(obj)
  }
  const totalAuthorLikes = []
  for (let i = 0; i < uniqueAuthors.length; i++) {
    let num = 0
    for (let j = 0; j < authorList.length; j++) {
      if (uniqueAuthors[i] === authorList[j].author) {
        num = num + authorList[j].likes
      }
    }
    const obj = { author: uniqueAuthors[i], likes: num }
    totalAuthorLikes.push(obj)
  }
  const mappedBlog = totalAuthorLikes.map(value => value.likes)
  const maxValue = Math.max(...mappedBlog)
  const maxIndex = mappedBlog.indexOf(maxValue)
  return totalAuthorLikes[maxIndex]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}