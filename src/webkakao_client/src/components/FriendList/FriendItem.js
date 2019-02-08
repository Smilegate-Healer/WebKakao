import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import { Typography } from '@material-ui/core'
import {Person} from '@material-ui/icons'

class FriendItem extends React.Component {

  render() {

    const { user } = this.props

    return (
      <div className="Item" onClick={this.props.onClick}>
        <div className="profileContainer" onClick={this.props.onProfileClick}>
          {
            user.profile_img && user.profile_img !== 'default' ? user.profile_img : <Person fontSize="large"/>
          }
          {user.profile_img}
        </div>

        <div className="nameStatusMsgContainer">
          <div className="name">
            <Typography variant="body1" color="textPrimary">
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