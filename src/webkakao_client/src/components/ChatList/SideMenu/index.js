import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { HowToReg, Create, ExitToApp } from "@material-ui/icons";
import FriendItem from "./MemberItem";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

@inject("stores")
@observer
class SideMenu extends React.Component {
  state = {
    right: false
  };

  hideChatroomSideMenu = () => {
    const { view } = this.props.stores;
    view.hideChatroomSideMenu();
  };

  toggleDrawer = open => () => {
    const { view } = this.props.stores;
    if (open === "true") {
      view.showChatroomSideMenu();
    } else {
      view.hideChatroomSideMenu();
    }
  };

  onButtonClick = button => () => {
    const { chatroom, view } = this.props.stores;

    switch (button) {
      case "rename":
        view.showRenameChatroomModal();
        break;
      case "invite":
        view.showUserListModal("invite");
        break;
      case "exit":
        chatroom.checkoutChatroom();
        break;
      default:
        alert("Error");
        break;
    }
  };

  _randerFriendList = () => {
    const { chatroom } = this.props.stores;
    const userList = chatroom.getSelectedChatroomUserList();
    if (userList) {
      return (
        <div className={`${this.props.className}`}>
          {userList.map((v, idx) => (
            <FriendItem user={v} key={v.name} />
          ))}
        </div>
      );
    }
  };

  _randerFunc = () => {
    const { classes } = this.props;
    const userList = this._randerFriendList();
    return (
      <div className={classes.list}>
        <List>
          <ListItem
            button
            key="채팅방 이름 변경"
            onClick={this.onButtonClick("rename")}>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText primary="채팅방 이름 변경" />
          </ListItem>
          <ListItem
            button
            key="대화 상대 초대"
            onClick={this.onButtonClick("invite")}>
            <ListItemIcon>
              <HowToReg />
            </ListItemIcon>
            <ListItemText primary="대화 상대 초대" />
          </ListItem>
        </List>
        <Divider />
        {userList}
        <Divider />
        <List>
          <ListItem
            button
            key="채팅방 나가기"
            onClick={this.onButtonClick("exit")}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="채팅방 나가기" />
          </ListItem>
        </List>
      </div>
    );
  };

  render() {
    const { view } = this.props.stores;

    const sideList = this._randerFunc();

    return (
      <div>
        <SwipeableDrawer
          anchor="right"
          open={view.chatroomSideMenu}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}>
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideMenu);
