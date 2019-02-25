import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Typography } from "@material-ui/core";
import DateFormatter from "../../utils/DateFormatter";
import ChatroomNameFormatter from "../../utils/ChatroomNameFormatter";
import { observer } from "mobx-react";
import DefaultProfileImg from "../../resources/img_person_no1.png";
import Badge from "@material-ui/core/Badge";
import classnames from "classnames"

@observer
class ListItem extends React.Component {
  static defaultProps = {
    item: {
      chatroomName: "기본이름",
      logo: null,
      last_msg: "마지막 메시지 입니다.",
      timestamp: 1234123412342312
    },
    selected: false
  };

  _renderLogo = logo => {
    const { item } = this.props
    
    if(!item.user_list) {
      logo = null
    } else if(item.user_list.length === 1) {
      logo = item.user_list[0].profile_img
    } 

    const memberCnt = item.user_list ? item.user_list.length : 1

    const getImg = (logo, classname) => {
      return (
        <img
          src={logo ? `/profile/${logo}` : DefaultProfileImg}
          alt="chatroomLogo"
          className={`logo ${classname ? classname : ''}`}
        />
      )
    }

    const getImages = () => {
      return item.user_list.map((user, idx) => {
        return (
          <div className={`base img${idx + 1}`}>
            {getImg(user.profile_img)} 
          </div>
        )
      }) 
    }

    if(memberCnt === 1) {
      return getImg(logo)
    } else {
      return (
        <div className={classnames({
          two: memberCnt === 2,
          three: memberCnt === 3,
          four: memberCnt >= 4
        })}>
          {getImages()}
        </div>
      )
    }
  };

  render() {
    const { item } = this.props;
    const count = item.last_msg_idx - item.last_read_msg_idx;

    const date = DateFormatter.getKoreanDate(item.timestamp);
    const chatroomName = ChatroomNameFormatter.getChatroomName(
      item.user_list,
      item.chatroom_name
    );

    var lastMsg = null
    switch(item.msg_type) {
      case "p": 
        lastMsg = "Photo"
        break
      case "v":
        lastMsg = "Video"
        break
      case "f":
        var indexOfSpace = item.last_msg.indexOf(" ")
        lastMsg = "File " + item.last_msg.substring(indexOfSpace, item.last_msg.length)
        break
      default:
        lastMsg = item.last_msg
    }

    if (!item.hide) {

      var membersCount = item.user_list ? item.user_list.length + 1 : 1

      return (
        <li className={classnames("ListItem", {
            selected: this.props.selected
          })} 
          onClick={this.props.onClick}
        >
          <div className="logoContainer" onClick={this.props.onLogoClick}>
            {this._renderLogo(item.logo)}
          </div>

          <div className="nameMsgContainer">
            <div className="name">
              <Typography variant="body1" color="textPrimary" noWrap={true}>
                {chatroomName}
              </Typography>
              {
                membersCount === 2
                ? null
                : <div className="count">
                  <Typography variant="body1" color="textSecondary" noWrap={true}>
                    {membersCount}
                  </Typography>
                </div>
              }
            </div>
            <div className="msg">
              <Typography variant="body2" color="textSecondary" noWrap={true}>
                {lastMsg}
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
  }),
  selected: PropTypes.bool
};

export default ListItem;
