import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import DateFormatter from '../../utils/DateFormatter'
import ProfileImage from "../ProfileImage"
import { inject, observer } from "mobx-react"

@inject("stores")
@observer
class ChatItem extends React.Component {
  static defaultProps = {
    isMine: false
  };

  getNotReadUserCount = msg_idx => {
    const { chatroomList } = this.props.stores.chatroom
    const { view } = this.props.stores

    let data;
    for (var i = 0; i < chatroomList.length; i++) {
      if (chatroomList[i].chatroom_idx === view.selectedChatroom) {
        data = chatroomList[i];
        break;
      }
    }
    if (!data.user_list) {
      return 0;
    }
    
    let notReadUserCount = data.user_list.length;
    for (var i = 0; i < data.user_list.length; i++) {
      if (data.user_list[i].last_read_msg_idx >= msg_idx) {
        notReadUserCount--;
      }
    }
    return notReadUserCount;
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
      <img className="media" src={chat.msg} alt={chat.msg} />
    )

  }

  _renderProfile = (profile) => {
    return (
      <ProfileImage
        className="profileImg"
        image={profile}
      />
    )
  }

  _renderFile = () => {
    const { chat } = this.props
    const indexOfSpace = chat.msg.indexOf(" ")
    const url = chat.msg.substring(0, indexOfSpace) 
    const filename = chat.msg.substring(indexOfSpace, chat.msg.length)

    return (
      <div>
        <Typography>
          <a 
            href={url}
            download
            className="link"
          >
            {filename}
          </a>
        </Typography>
      </div>
    )
  }

  _renderContent = (type) => {
    switch (type) {
      case "p": return this._renderPhoto()
      case "f": return this._renderFile()
      default:
        return this._renderMsg()
    }
  }

  _renderNotReadUserCount = () => {
    const { chat } = this.props;
    const notReadUserCount = this.getNotReadUserCount(chat.msg_idx);
    if (notReadUserCount > 0){
      return (<Typography variant="caption" className="notReadUserCount">{notReadUserCount}</Typography>);
    }
      else {
        return (<Typography variant="caption" className="notReadUserCount">{' '}</Typography>);
      }
  }

  _renderNotMine() {
    const { chat } = this.props;
    const { user } = this.props.stores;
    var fullTime = DateFormatter.getKoreanDate(chat.timestamp)
    const senderName = user.getNameOnChatroom(chat.sender)
    const notReadUserCount = this._renderNotReadUserCount();
    const chatroomInfo = this.props.stores.chatroom.chatroomList
      .find((info) => info.chatroom_idx === this.props.stores.view.selectedChatroom)

    var profile = null
    if(chatroomInfo && chatroomInfo.user_list) {
      const userInfo = chatroomInfo.user_list.find(info => info.user_idx === parseInt(chat.sender))
      if(userInfo) {
        profile = userInfo.profile_img
      }
    }

    return (
      <div className="ChatItem">
        <div className="profileContainer">
          {this._renderProfile(profile)}
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

  _renderInvite = () => {
    const { chat } = this.props;
    const { user } = this.props.stores;
    // const user_idxs = chat.msg.trim().split(" ");
    const senderName = user.getNameOnChatroom(chat.sender)
    const users = chat.msg.trim().split("/");
    const user_names = users[1];
    // let names = '';
    // for(var i=0; i<user_idxs.length; i++) {
    //   names = names.concat(user.getNameOnChatroom(+user_idxs[i]) + ' ')
    // }
    return (<div className="info"><Typography>{senderName} 님이 {user_names} 님을 초대하였습니다.</Typography></div>)
  }

  _renderExit = () => {
    const { chat } = this.props;
    return (<div className="info"><Typography>{chat.msg} 님이 퇴장하였습니다.</Typography></div>)
  }

  render() {
    const { chat } = this.props;
    if (chat.msg_type === 'm') {
      if (this.props.isMine) {
        return this._renderMine();
      }
      return this._renderNotMine();
    }
    else if(chat.msg_type === 'i') {
      return this._renderInvite();
    } else if(chat.msg_type === 'e') {
      return this._renderExit();
    }
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
