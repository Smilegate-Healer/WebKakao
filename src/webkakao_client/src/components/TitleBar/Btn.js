import React from "react";
import { Component } from "react";
import { IconButton } from '@material-ui/core'
import {
  SearchOutlined,
  AddOutlined,
  SettingsOutlined
} from '@material-ui/icons'
import { observer, inject } from "mobx-react";


@inject("stores")
@observer
class Btn extends Component {
  _renderLogo = () => {
    let logo;
    switch (this.props.btnName) {
      case "search":
        logo = <SearchOutlined />;
        break;
      case "new_talk":
        logo = <AddOutlined />;
        break;
      case "setting":
        logo = <SettingsOutlined />;
        break;
      default:
        logo = null;
    }
    return logo;
  };

  onClickButton = () => {
    const { view } = this.props.stores

    switch (view.leftView) {
      case view.views.chatroomList:
        switch (this.props.btnName) {
          case "search":
            view.showSearchBar();
            break;
          case "new_talk":
            alert("chatroom list new_talk");
            break;
          case "setting":
            alert("chatroom list setting");
            break;
          default:
            alert("chatroom list default");
        }
        break;
      case view.views.friendList:
        switch (this.props.btnName) {
          case "search":
            view.showSearchBar();
            break;
          case "new_talk":
            view.showUserSearchModal();
            break;
          case "setting":
            alert("friend list setting");
            break;
          default:
            alert("friend list default");
        }
        break;
      case view.views.option:
        switch (this.props.btnName) {
          case "search":
            alert("option search");
            break;
          case "new_talk":
            alert("option new_talk");
            break;
          case "setting":
            alert("option setting");
            break;
          default:
            alert("option default");
            break;
        }
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <IconButton classes={{ colorInherit: "button" }} color="inherit" onClick={this.onClickButton}>
        {this._renderLogo()}
      </IconButton>
    )
  }
}

export default Btn;
