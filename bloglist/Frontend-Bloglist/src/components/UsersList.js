import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

const UsersList = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>users</Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Header as='h4'>
                  <Header.Content>
                    <Link to={`users/${user.id}`}>
                      {user.name}
                    </Link>
                    <Header.Subheader>{user.username}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
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
  {}
)(UsersList)

