import React from 'react'
import img_person_no1 from '../../../resources/img_person_no1.png';

import PropTypes from 'prop-types'
// import './styles.scss'

class Background extends React.Component {

  render() {
    return (
      <div>
        <img src={img_person_no1}
        style={{
          width: 350,
        }}
        />
      </div>
    )
  }
}

Background.propTypes = {
  onClick: PropTypes.func
}

export default Background