import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'INIT_BLOGS':
      return action.data
    case 'UPDATE_BLOG':
      // eslint-disable-next-line no-case-declarations
      const likedBlog = action.data
      return state.map(blog => blog.id !== likedBlog.id ?
        blog : likedBlog)
    case 'ADD_COMMENT':
      // eslint-disable-next-line no-case-declarations
      const commentedBlog = action.data
      return state.map(blog => blog.id !== commentedBlog.id ?
        blog : commentedBlog)
    default:
      return state
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    console.log('id:', id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    console.log('id:', id)
    dispatch({
      type: 'ADD_COMMENT',
      data: updatedBlog
    })
  }
}

export default blogReducer