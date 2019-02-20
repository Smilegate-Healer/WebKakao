import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Typography } from "@material-ui/core";
import DateFormatter from "../../utils/DateFormatter";
import ChatroomNameFormatter from "../../utils/ChatroomNameFormatter";
import { observer } from "mobx-react";
import DefaultProfileImg from "../../resources/img_person_no1.png";
import Badge from "@material-ui/core/Badge";

@observer
class ListItem extends React.Component {
  static defaultProps = {
    item: {
      chatroomName: "기본이름",
      logo: null,
      last_msg: "마지막 메시지 입니다.",
      timestamp: 1234123412342312
    }
  };

  _renderLogo = logo => {
    const { item } = this.props
    
    if(!item.user_list) {
      logo = null
    } else if(item.user_list.length === 1) {
      logo = item.user_list[0].profile_img
    }

    return (
      <img
        src={logo ? "http://localhost:8083/profile/" + logo : DefaultProfileImg}
        alt="chatroomLogo"
        className="logo"
      />
    )
  };

  render() {
    const { item } = this.props;
    const count = item.last_msg_idx - item.last_read_msg_idx;

    const date = DateFormatter.getKoreanDate(item.timestamp);
    const chatroomName = ChatroomNameFormatter.getChatroomName(
      item.user_list,
      item.chatroom_name
    );
    if (!item.hide) {
      return (
        <li className="ListItem" onClick={this.props.onClick}>
          <div className="logoContainer" onClick={this.props.onLogoClick}>
            {this._renderLogo(item.logo)}
          </div>

          <div className="nameMsgContainer">
            <div className="name">
              <Typography variant="body1" color="textPrimary" noWrap={true}>
                {chatroomName}
              </Typography>
            </div>
            <div className="msg">
              <Typography variant="body2" color="textSecondary" noWrap={true}>
                {item.last_msg}
              </Typography>
            </div>
          </div>

          <div className="dateBadgeContainer">
            <div className="date">
              <Typography variant="body2" className="text">
                {date}
              </Typography>
            </div>
            <div className="badge">
              <Badge 
                classes={{
                  root: "badgeRoot",
                  colorPrimary: "color"
                }}
                badgeContent={count}
                color="primary"
                max={999}
              />
            </div>
          </div>
        </li>
      );
    } else {
      return <div />;
    }
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    chatroomName: PropTypes.string,
    logo: PropTypes.string,
    lastMsg: PropTypes.string,
    date: PropTypes.string
  })
};

export default ListItem;
