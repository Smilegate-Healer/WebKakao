import React from 'react'
import "./styles.scss"
import DefaultProfileImg from "../../resources/img_person_no1.png"

export default class ProfileImage extends React.Component {
  render() {
    const { image } = this.props
    return (
      <img
        className={`profile ${this.props.className}`}
        alt="profile"
        src={image ? `http://localhost:8083/profile/${image}` : DefaultProfileImg} 
      /> 
    )
  }
}