import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Menu, Button } from 'semantic-ui-react'

const NavBar = (props) => {

  const padding = {
    paddingRight: 5
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    props.logout()
    props.setNotification('you are successfully logged out', 5000)
  }

  return (
    <Menu>
      <Menu.Item link>
        <Link style={padding} to="/">blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link style={padding} to="/users">users</Link>
      </Menu.Item>
      <Menu.Item position='right'>
        <em>{props.user.name} is logged in </em>

        <Button style={{ marginLeft: '0.5em' }}
          onClick={() => handleLogout()}>
          Log out
        </Button>
      </Menu.Item>

    </Menu>
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
    logout,
    setNotification
  }
)(NavBar)