import React from 'react'
import img_person_no1 from '../../../resources/img_person_no1.png';

import {
    Close
} from '@material-ui/icons'
import PropTypes from 'prop-types'
// import './styles.scss'

class Profile extends React.Component {

  render() {
    return (
      <div>
        <img src={img_person_no1}
        style={{
        }}
        />
      </div>
    )
  }
}

Profile.propTypes = {
  onClick: PropTypes.func
}

export default Profile