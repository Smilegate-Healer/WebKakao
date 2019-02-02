import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import { Person } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

class ChatItem extends React.Component {
  static defaultProps = {
    isMine: false
  };

  _renderMine() {
    const { chat } = this.props

    return (
      <div className="ChatItem ChatItemMine">
        <div className="timeContainer timeMine">
          <Typography variant="caption">{chat.timestamp}</Typography>
        </div>
        
        <div className="senderMsgContainer senderMsgContainerMine">
          <div className="msg msgMine">
            <Typography variant="body1" color="textPrimary">
              {chat.msg}
            </Typography>
          </div>
        </div>
      </div>
    ) 
  }

  _renderNotMine() {
    const { chat } = this.props;

    return (
      <div className="ChatItem">
        <div className="profileContainer">
          {chat.profile ? chat.profile : <Person />}
        </div>

        <div className="senderMsgContainer">
          <div className="sender">
            <Typography variant="body2" color="textSecondary">
              {chat.sender}
            </Typography>
          </div>
          <div className="msg">
            <Typography variant="body1" color="textPrimary">
              {chat.msg}
            </Typography>
          </div>
        </div>

        <div className="timeContainer">
          <Typography variant="caption">{chat.timestamp}</Typography>
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
  chat: PropTypes.objectOf({
    profile: PropTypes.string,
    sender: PropTypes.string,
    timestamp: PropTypes.string,
    msg: PropTypes.string
  }),
  isMine: PropTypes.bool
};

export default ChatItem;
