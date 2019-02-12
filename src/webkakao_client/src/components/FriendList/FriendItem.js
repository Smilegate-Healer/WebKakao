import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import { Typography } from '@material-ui/core'
import DefaultProfileImg from '../../resources/img_person_no1.png'
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
class FriendItem extends React.Component {

  onClick = () => {
    debugger;
    const { user } = this.props.stores;
    const req = {
      user_idx: this.props.user.user_idx
    }
    user.getUserInfo(req);
  }

  _renderProfile = (profile_img) => {
    return (
      <img
        className="profile"
        alt="profile"
        src= {profile_img && profile_img !== 'default' ? profile_img : DefaultProfileImg} // TODO: delete "defualt"
      />
    )
  }

  render() {

    const { user } = this.props

    return (
      <div className="Item" onClick={this.onClick}>
        <div className="profileContainer" onClick={this.props.onProfileClick}>
          {this._renderProfile(user.profile_img)}
        </div>

        <div className="nameStatusMsgContainer">
          <div className="name">
            <Typography className="text" variant="body1" color="textPrimary">
              {user.name}
            </Typography>
          </div>
          <div className="statusMsg">
            <Typography variant="body2" color="textSecondary">
              {user.status_msg}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

FriendItem.propTypes = {
  info: PropTypes.shape({
    profile_img: PropTypes.string,
    name: PropTypes.string.isRequired,
    status_msg: PropTypes.string
  }),
  onClick: PropTypes.func,
  onProfileClick: PropTypes.func
}

export default FriendItem