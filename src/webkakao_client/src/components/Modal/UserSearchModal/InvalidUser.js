import React from 'react'

import {
    Close
} from '@material-ui/icons'
import PropTypes from 'prop-types'
// import './styles.scss'

class InvalidUser extends React.Component {

  render() {
    return (
        <Close 
          className="icon"
          fontSize="small"
          />
    )
  }
}

InvalidUser.propTypes = {
  onClick: PropTypes.func
}

export default InvalidUser