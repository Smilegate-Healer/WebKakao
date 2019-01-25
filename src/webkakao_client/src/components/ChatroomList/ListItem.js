import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'


class ListItem extends React.Component {


  render() {
    const { item } = this.props
    return (
      <li className="ListItem" onClick={this.props.onClick}>
        <div className="logoContainer" onClick={this.props.onLogoClick}>
          {item.logo}
        </div>

        <div className="nameMsgContainer">
          <div className="name">
            {item.chatroom_idx}
          </div>
          <div className="msg">
            {item.last_msg_idx}
          </div>
        </div>

        <div className="dateContainer">
          {item.date}
        </div>
      </li>
    )
  }
}

ListItem.propTypes = {
  item: PropTypes.array
}


export default ListItem