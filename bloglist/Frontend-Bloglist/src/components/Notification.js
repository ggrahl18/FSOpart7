import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  const notificationToDisplay = props.notification

  return (
    <div>
      {notificationToDisplay === '' ?
        <div></div> :
        <Message>
          <p>
            {notificationToDisplay}
          </p>
        </Message>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification