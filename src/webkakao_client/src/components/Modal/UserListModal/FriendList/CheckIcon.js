import React from 'react'
import { 
  IconButton,
} from '@material-ui/core'
import {
  PanoramaFishEye,
  CheckCircle
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import './styles.scss'

class CheckIcon extends React.Component {

  render() {
    const checked = this.props.checked;
    return (
      <IconButton
        aria-label="Checked box"
        onClick={this.props.onClick}
        className="checkButton"
      >
      {
        checked
        ? <CheckCircle 
          className="icon"
          fontSize="default"
          style={{color: "#F9DC09"}}
        />
        : <PanoramaFishEye 
          className="icon"
          fontSize="default"
        />
      }
      </IconButton>
    )
  }
}

CheckIcon.propTypes = {
  onClick: PropTypes.func
}

export default CheckIcon