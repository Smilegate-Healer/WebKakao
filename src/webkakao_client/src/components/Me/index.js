import React from 'react'
import { Typography } from '@material-ui/core'
import DefaultProfileImg from '../../resources/img_person_no1.png'
import { observer, inject } from 'mobx-react';
import "./styles.scss"
import ProptTypes from 'prop-types'

@inject("stores")
@observer
class Me extends React.Component {

  onClick = () => {

  }

  _renderProfile = (profile_img) => {
    return (
      <img
        className="profile"
        alt="profile"
        src={profile_img ? `http://localhost:8083/profile/${profile_img}` : DefaultProfileImg} 
      />
    )
  }

  _onClick = (e) => {
    const { isFriendList, stores } = this.props  

    if(isFriendList) {
      // TODO: Show profile information like others 
    } else {
      stores.view.showEditProfile()
    }
  }

  render() {
    const { userInfo } = this.props.stores.user
    if(userInfo) 
      return (
        <div className="MeItem" onClick={this._onClick}>
          <div className="profileContainer">
            {this._renderProfile(userInfo.profile_img)}
          </div>

          <div className="nameStatusMsgContainer">
            <div className="name">
              <Typography className="text" variant="body1" color="textPrimary">
                {userInfo.name}
              </Typography>
            </div>
            <div className="statusMsg">
              <Typography variant="body2" color="textSecondary">
                {this.props.isFriendList ? userInfo.status_msg : userInfo.email}
              </Typography>
            </div>
          </div>
        </div>
      )
    else return null
  }

  static defaultProps = {
    isFriendList: false
  }
}

Me.propTypes = {
  isFriendList: ProptTypes.bool 
}

export default Me