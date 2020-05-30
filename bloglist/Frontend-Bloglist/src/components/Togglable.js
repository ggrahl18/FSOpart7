import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const style = {
    paddingTop: 10,
    paddingBottom: 10
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisiblity}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <table style={style}>
          <tbody>
            <tr>
              <td>
                <Button onClick={toggleVisiblity} size='small'>
                  cancel
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Togglable