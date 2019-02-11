import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import DateFormatter from '../../utils/DateFormatter'
import DefaultProfileImg from "../../resources/img_person_no1.png"


class ChatItem extends React.Component {
  static defaultProps = {
    isMine: false
  };

  _renderMine() {
    const { chat } = this.props
    var fullTime = DateFormatter.getKoreanDate(chat.timestamp)

    return (
      <div className="ChatItem ChatItemMine">
        <div className="timeContainer timeMine">
          <Typography variant="caption">{fullTime}</Typography>
        </div>
        
        <div className="senderMsgContainer senderMsgContainerMine">
          <div className="msg msgMine">
            <Typography className="text" variant="body1" color="textPrimary">
              {chat.msg}
            </Typography>
          </div>
        </div>
      </div>
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

  _renderNotMine() {
    const { chat } = this.props;
    var fullTime = DateFormatter.getKoreanDate(chat.timestamp)
    return (
      <div className="ChatItem">
        <div className="profileContainer">
          {this._renderProfile(chat.profile)}
        </div>

        <div className="senderMsgContainer">
          <div className="sender">
            <Typography variant="body2" color="textSecondary">
              {chat.sender}
            </Typography>
          </div>
          <div className="msg">
            <Typography className="text" variant="body1" color="textPrimary" noWrap>
              {chat.msg}
            </Typography>
          </div>
        </div>

        <div className="timeContainer">
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
