import React from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const LoginForm = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    event.target.username = ''
    event.target.password = ''

    const loggedUser = await props.login(credentials)
    console.log('USERNAME', props.user)

    if (loggedUser === undefined) {
      props.setNotification('wrong username or password', 5000)
      return
    }
    props.setNotification('you are successfully logged in', 5000)
  }

  return (
    props.user === null ?
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            Log-in to your account
          </Header>
          <Form onSubmit={handleLogin} className='Login' size='large'>
            <Segment raised>
              <Form.Field >
                <label>username</label>
                <Form.Input id='username' fluid icon='user' iconPosition='left' placeholder='username ' name='username' />
              </Form.Field>
              <Form.Field>
                <label>password</label>
                <Form.Input id='password' fluid icon='lock' iconPosition='left' placeholder='password' name='password' type='password' />
              </Form.Field>
              <Button type="submit" fluid size='large'>
                login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      : <div></div>
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
    login,
    logout,
    setNotification
  }
)(LoginForm)