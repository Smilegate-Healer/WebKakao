import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class FriendItem extends React.Component {

  render() {

    const { user } = this.props

    return (
      <div className="Item" onClick={this.props.onClick}>
        <div className="profileContainer" onClick={this.props.onProfileClick}>
          {user.profile_img}
        </div>

        <div className="nameStatusMsgContainer">
          <div className="name">
            {user.name}
          </div>
          <div className="statusMsg">
            {user.status_msg}
          </div>
        </div>
      </div>
    )
  }
}

FriendItem.propTypes = {
  info: PropTypes.object,
  onClick: PropTypes.func,
  onProfileClick: PropTypes.func
}

export default FriendItem