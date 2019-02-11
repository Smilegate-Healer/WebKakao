import React from 'react'
import { 
  Button,
  IconButton,
  ButtonBase,
} from '@material-ui/core'
import {
  ArrowUpward
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import './styles.scss'

class SendBtn extends React.Component {

  render() {
    return (
      <IconButton
        aria-label="Send the message"
        onClick={this.props.onClick}
        classes={{root: "SendBtn"}}
        style={{
          backgroundColor: "#F9DC09"
        }}>
        <ArrowUpward 
          classes={{root: "icon"}}
          fontSize="inherit"/>
      </IconButton>
    )
  }
}

SendBtn.propTypes = {
  onClick: PropTypes.func
}

export default SendBtn