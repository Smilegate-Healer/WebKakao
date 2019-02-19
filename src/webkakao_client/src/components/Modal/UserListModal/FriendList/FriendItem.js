import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import { Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react';
import CheckIcon from './CheckIcon';
import ProfileImage from '../../../ProfileImage';

@inject('stores')
@observer
class FriendItem extends React.Component {

  onClick = () => {
    const { view } = this.props.stores;
    view.checkUserList(this.props.user.user_idx);
  }

  _renderProfile = (profile_img) => {
    return (
      <ProfileImage
        image={profile_img} 
      />
    )
  }

  render() {
    const { user } = this.props
    if (!user.hide) {
      return (
      <div className="Item" onClick={this.onClick}>
        <div className="profileContainer">
          {this._renderProfile(user.profile_img)}
        </div>

        <div className="nameStatusMsgContainer">
          <div className="name">
            <Typography className="text" variant="body1" color="textPrimary">
              {user.name}
            </Typography>
          </div>
        </div>
        <div className="checkButtonContainer">
          <CheckIcon checked={user.checked}/>
        </div>
      </div>)
    } else {
      return (<div></div>)
    }
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