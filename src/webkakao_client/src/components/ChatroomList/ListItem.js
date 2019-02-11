import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import { Typography } from '@material-ui/core'
import DateFormatter from '../../utils/DateFormatter'
import ChatroomNameFormatter from '../../utils/ChatroomNameFormatter'
import { observer } from 'mobx-react';
import DefaultProfileImg from '../../resources/img_person_no1.png'

@observer
class ListItem extends React.Component {

  static defaultProps = {
    item: {
      chatroomName: "기본이름",
      logo: null,
      last_msg: "마지막 메시지 입니다.",
      timestamp: 1234123412342312
    }
  }

  _renderLogo = (logo) => {
    return (
      <img
        src={logo ? logo : DefaultProfileImg}
        alt="chatroomLogo"
        className="logo"
      />
    )
  }

  render() {
    const { item } = this.props

    const date = DateFormatter.getKoreanDate(item.timestamp)
    const chatroomName = ChatroomNameFormatter.getChatroomName(item.user_list, item.chatroom_name)
    return (
      <li className="ListItem" onClick={this.props.onClick}>
        <div className="logoContainer" onClick={this.props.onLogoClick}>
          {this._renderLogo(item.logo)}
        </div>

        <div className="nameMsgContainer">
          <div className="name">
            <Typography 
              variant="body1" 
              color="textPrimary"
              noWrap={true}>
              {chatroomName} 
            </Typography>
          </div>
          <div className="msg">
            <Typography 
              variant="body2" 
              color="textSecondary" 
              noWrap={true}>
              {item.last_msg}
            </Typography>
          </div>
        </div>

        <div className="dateContainer">
          <Typography variant="body2" className="date">
            {date}
          </Typography>
        </div>
      </li>
    )
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    chatroomName: PropTypes.string,
    logo: PropTypes.string,
    lastMsg: PropTypes.string,
    date: PropTypes.string
  })
}



export default ListItem