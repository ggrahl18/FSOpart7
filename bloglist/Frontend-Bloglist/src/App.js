import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import User from './components/User'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { Container, Segment } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = (props) => {
  useEffect(() => {
    props.initializeBlogs()
    props.getUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user).then(blogService.setToken(user.token)
      )
    }
  }, [])

  if (props.user === null) {
    return (
      <Container>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  const findById = (collection, id) =>
    collection.find(u => u.id === id)

  return (
    <div>
      <Container>
        <Segment basic>
          <Router>
            <NavBar />
            <Notification />
            <Route exact path="/" render={() => <BlogList />} />
            <Route exact path="/users" render={() => <UsersList />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={findById(props.users, match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={findById(props.blogs, match.params.id)} />} />
          </Router>
        </Segment>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  {
    initializeBlogs,
    setUser,
    getUsers
  }
)(App)
