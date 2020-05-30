const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => { return total + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? undefined
    : blogs.reduce((currBlog, nextblog) => {
      return nextblog.likes > currBlog.likes ? nextblog : currBlog
    })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}