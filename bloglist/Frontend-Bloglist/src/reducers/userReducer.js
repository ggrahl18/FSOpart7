import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    console.log(action.data)
    return action.data
  case 'LOGOUT_USER':
    return action.data
  default:
    return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      return (user)
    } catch (exception) {
      console.log('exception is thrown')
      return undefined
    }
  }
}

export const logout = () => {
  return ({
    type: 'LOGOUT_USER',
    data: null
  })
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: { name: user.name, username: user.username, token: user.token }
    })
  }
}

export default userReducer