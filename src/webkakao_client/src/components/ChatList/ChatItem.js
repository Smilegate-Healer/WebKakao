import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import DateFormatter from '../../utils/DateFormatter'
import DefaultProfileImg from "../../resources/img_person_no1.png"
import { inject, observer } from "mobx-react"

@inject("stores")
@observer
class ChatItem extends React.Component {
  static defaultProps = {
    isMine: false
  };

  _renderMine() {
    const { chat } = this.props
    var fullTime = DateFormatter.getKoreanDate(chat.timestamp)
    const notReadUserCount = this._renderNotReadUserCount();
    return (
      <div className="ChatItem ChatItemMine">
        <div className="mineTimeContainer timeMine">
          {notReadUserCount}
          <Typography variant="caption">{fullTime}</Typography>
        </div>
        
        <div className="senderMsgContainer senderMsgContainerMine">
          <div className="msg msgMine">
            {this._renderContent(chat.msg_type)}
          </div>
        </div>
      </div>
    ) 
  }

  _renderMsg = () => {
    const { chat } = this.props

    return (
      <Typography className="text" variant="body1" color="textPrimary">
        {chat.msg}
      </Typography>
    )
  }

  _renderPhoto = () => {
    const { chat } = this.props

    return (
      <img className="media" src={"http://localhost:8083" + chat.msg} alt={chat.msg}/>
    )

  }

  _renderProfile = (profile) => {
    return (
      <img
        className="profileImg"
        src={profile ? profile : DefaultProfileImg}
        alt="profile"
      />
    )
  }

  _renderFile = () => {
    const { chat } = this.props

    return (
      <a href={`http://localhost:8083` + chat.msg} download>File Link</a>
    )
  }

  _renderContent = (type) => {
    switch(type) {
      case "p": return this._renderPhoto() 
      case "f": return this._renderFile()
      default:
        return this._renderMsg()
    }
  }

  _renderNotReadUserCount = () => {
    const { chat } = this.props;
    const { chatroom } = this.props.stores;
    const notReadUserCount = chatroom.getNotReadUserCount(chat.msg_idx);
    if(notReadUserCount > 0)
      return (<Typography variant="caption" className="notReadUserCount">{notReadUserCount}</Typography>);
  }

  _renderNotMine() {
    const { chat } = this.props;
    const { user } = this.props.stores;
    var fullTime = DateFormatter.getKoreanDate(chat.timestamp)
    const senderName = user.getFriendNameByUserIdx(chat.sender)
    const notReadUserCount = this._renderNotReadUserCount();
    return (
      <div className="ChatItem">
        <div className="profileContainer">
          {this._renderProfile(chat.profile)}
        </div>

        <div className="senderMsgContainer">
          <div className="sender">
            <Typography variant="body2" color="textSecondary">
              {senderName}
            </Typography>
          </div>
          <div className="msg">
            {this._renderContent(chat.msg_type)}
          </div>
        </div>

        <div className="timeContainer">
          {notReadUserCount}
          <Typography variant="caption">{fullTime}</Typography>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.isMine) {
      return this._renderMine();
    }
    return this._renderNotMine();
  }
}

ChatItem.propTypes = {
  chat: PropTypes.shape({
    profile: PropTypes.string,
    sender: PropTypes.number,
    timestamp: PropTypes.string,
    msg: PropTypes.string
  }),
  isMine: PropTypes.bool
};

export default ChatItem;
