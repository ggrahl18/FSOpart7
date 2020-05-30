import React from 'react'
import BlogForm from './BlogForm'
import { connect } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Segment, Header } from 'semantic-ui-react'

const BlogList = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div >
      <Header as='h3' block>
        Blogs
      </Header>
      <BlogForm />
      {props.blogs.sort(byLikes).map(blog =>
        <Segment vertical size='small' key={blog.id} >
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </Segment>
      )}
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
  {
    removeBlog,
    updateBlog
  }
)(BlogList)