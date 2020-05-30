import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeBlog, updateBlog, addComment } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import { Segment, Button, Form } from 'semantic-ui-react'

const BlogNoHistory = (props) => {

  const blog = props.blog

  const [visible, setVisible] = useState(true)

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const handleLikeClick = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    handleBlogChange(likedBlog)
  }

  const handleBlogChange = async (updatedBlog) => {
    props.updateBlog(updatedBlog)
  }

  const handleBlogRemove = async (blogToDelete) => {
    if (window.confirm(`remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      props.removeBlog(blogToDelete.id)
      props.history.push('/')
    }
  }

  const toggleRemoveButton = (blog) => {
    return ({ display: blog.user.username === props.user.username ? '' : 'none' })
  }

  if (blog === undefined) {
    return null
  }

  const showComments = (blog) => {
    if (blog.comments.length > 0) {
      return (
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}> {comment}</li>)}
        </ul>
      )
    } else {
      return (<div>no comments</div>)
    }
  }

  const addComment = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    event.target.comment.value = ''
    if (comment.trim().length !== 0) {
      props.addComment(blog.id, comment)
    }
  }

  return (
    <div key={blog.id} className='blog' >
      <Segment vertical>
        <Segment.Group>
          <Segment>{blog.title} {blog.author}</Segment>
          <Segment.Group>
            <Segment>{blog.url}</Segment>
            <Segment>{blog.likes} likes</Segment>
            <Segment>added by {blog.user.name}</Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment basic>
              <Button onClick={() => handleLikeClick(blog)}>
                like
              </Button>
            </Segment>
            <Segment basic>
              <Button onClick={() => toggleVisiblity()}>
                comment
              </Button>
            </Segment>
            <div style={toggleRemoveButton(blog)}>
              <Segment basic>
                <Button
                  onClick={() => handleBlogRemove(blog)}>
                  remove
                </Button>
              </Segment>
            </div>
          </Segment.Group>
          <Segment>
            <div style={{ display: visible ? 'none' : '' }}>
              <Form onSubmit={addComment}>
                <Form.Field>
                  <label>Add comment</label>
                  <Form.Input name='comment' />
                  <Button type="submit">
                    submit
                  </Button>
                </Form.Field>
              </Form>
            </div>
            {showComments(blog)}
          </Segment>
        </Segment.Group>
      </Segment>
    </div >
  )
}

const Blog = withRouter(BlogNoHistory)

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
  handleBlogChange: PropTypes.func,
  handleRemoveClick: PropTypes.func
}

export default connect(
  mapStateToProps,
  {
    removeBlog,
    updateBlog,
    addComment
  }
)(Blog)