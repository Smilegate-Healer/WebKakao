import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import DefaultProfileImg from "../../resources/img_person_no1.png";
import { observer, inject } from "mobx-react";
import "./styles.scss";

@inject("stores")
@observer
class FriendItem extends React.Component {
  onClick = () => {
    const { user } = this.props.stores;
    const req = {
      user_idx: this.props.user.user_idx
    };
    user.getUserInfo(req);
  };

  _renderProfile = profile_img => {
    return (
      <img
        className="profile"
        alt="profile"
        src={
          profile_img
            ? `/profile/${profile_img}`
            : DefaultProfileImg
        }
      />
    );
  };
  
  render() {
    const { user } = this.props;
    if (!user.hide) {
      return (
        <div className="FriendItem" onClick={this.onClick}>
          <div className="profileContainer">
            {this._renderProfile(user.profile_img)}
          </div>

          <div className="nameStatusMsgContainer">
            <div className="name">
              <Typography className="text" variant="body1" color="textPrimary">
                {user.name}
              </Typography>
            </div>
            <div className="statusMsg">
              <Typography variant="body2" color="textSecondary">
                {user.status_msg}
              </Typography>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  static defaultProps = {
    user: {
      hide: false
    }
  };
}

FriendItem.propTypes = {
  user: PropTypes.shape({
    profile_img: PropTypes.string,
    name: PropTypes.string.isRequired,
    status_msg: PropTypes.string,
    hide: PropTypes.bool
  }),
  onClick: PropTypes.func,
  onProfileClick: PropTypes.func
};

export default FriendItem;
