import React from 'react'
import { 
  IconButton,
} from '@material-ui/core'
import {
  Close
} from '@material-ui/icons'
import PropTypes from 'prop-types'
// import './styles.scss'

class CloseBtn extends React.Component {

  render() {
    return (
      <IconButton
        aria-label="Send the message"
        onClick={this.props.onClick}
        className="SendBtn"
        style={{
          backgroundColor: "#f4f4f9"
        }}>
        <Close 
          className="icon"
          fontSize="small"
          />
      </IconButton>
    )
  }
}

CloseBtn.propTypes = {
  onClick: PropTypes.func
}

export default CloseBtn