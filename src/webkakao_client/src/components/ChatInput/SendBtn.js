import React from 'react'
import { 
  IconButton
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
        className="SendBtn">
        <ArrowUpward/>
      </IconButton>
    )
  }
}

SendBtn.propTypes = {
  onClick: PropTypes.func
}

export default SendBtn