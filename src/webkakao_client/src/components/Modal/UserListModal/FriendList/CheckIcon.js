import React from 'react'
import { 
  IconButton,
} from '@material-ui/core'
import {
  PanoramaFishEye,
  CheckCircle
} from '@material-ui/icons'
import PropTypes from 'prop-types'
// import './styles.scss'

class CheckIcon extends React.Component {

  _randerFunc = () => {
    const checked = this.props.checked;
    if(checked) {
      return (
        <IconButton
          aria-label="Send the message"
          onClick={this.props.onClick}
          className="SendBtn">
          <CheckCircle 
            className="icon"
            fontSize="large"
            // color="#F9DC09"
            />
        </IconButton>
      )
    } else {
      return (
        <IconButton
          aria-label="Send the message"
          onClick={this.props.onClick}
          className="SendBtn">
          <PanoramaFishEye 
            className="icon"
            fontSize="large"
            />
        </IconButton>
      )
    }
  }

  render() {
    const compenent = this._randerFunc();
    return (
      <div>
        {compenent}
      </div>
    )
  }
}

CheckIcon.propTypes = {
  onClick: PropTypes.func
}

export default CheckIcon