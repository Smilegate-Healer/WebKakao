import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class FriendItem extends React.Component {

  render() {

    const { info } = this.props

    return (
      <div className="Item" onClick={this.props.onClick}>
        <div className="profileContainer" onClick={this.props.onProfileClick}>
          {info.profileImg}
        </div>

        <div className="nameStatusMsgContainer">
          <div className="name">
            {info.name}
          </div>
          <div className="statusMsg">
            {info.statusMsg}
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