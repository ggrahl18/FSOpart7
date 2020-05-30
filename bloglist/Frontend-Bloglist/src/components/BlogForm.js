import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { Button, Form } from 'semantic-ui-react'

const BlogForm = (props) => {

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    try {
      props.createBlog(blogObject)
      props.setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added by username: ${props.user.username}`, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <Togglable buttonLabel="new blog">
        <h3>create new</h3>
        <Form onSubmit={handleAddBlog} size='mini'>
          <Form.Field >
            <label>title</label>
            <Form.Input id='title' placeholder='title' name='title' />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <Form.Input id='author' placeholder='author' name='author' />
          </Form.Field>
          <Form.Field>
            <label>url</label>
            <Form.Input id='url' placeholder='url' name='url' />
          </Form.Field>
          <Button id='createButton' type="submit" size='small'>create</Button>
        </Form>
      </Togglable>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { createBlog, setNotification, initializeBlogs }
)(BlogForm)