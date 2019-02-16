import React from 'react'
import userNotFound from '../../../resources/user_not_found.png';

import {
    Close
} from '@material-ui/icons'
import PropTypes from 'prop-types'
// import './styles.scss'

class InvalidUser extends React.Component {

  render() {
    return (
      <div>
        <img src={userNotFound} 
        style={{
          width: 300,
          marginTop: 30,
        }}
        />
      </div>
    )
  }
}

InvalidUser.propTypes = {
  onClick: PropTypes.func
}

export default InvalidUser