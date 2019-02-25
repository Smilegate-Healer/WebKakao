import React from 'react'
import "./styles.scss"
import DefaultProfileImg from "../../resources/img_person_no1.png"
import PropTypes from 'prop-types'

export default class ProfileImage extends React.Component {
 render() {
    const { image } = this.props
    return (
      <img
        className={`profile ${this.props.className}`}
        alt="profile"
        src={image ? `/profile/${image}` : DefaultProfileImg} 
      /> 
    )
  }
}

ProfileImage.propTypes = {
  image: PropTypes.string
}