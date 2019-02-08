import React from "react";
import { Component } from "react";
import Title from "./Title";
import Btn from "./Btn";
import "./TitleBar.scss";
import { observer, inject } from "mobx-react";


@inject("stores")
@observer
class TitleBar extends Component {
  state = {
    menu_type: "FriendList",
    title: "chat",
    firstBtn: "search",
    secondBtn: "new_talk",
    thirdBtn: "setting"
  };

  _renderTitle = () => {
    const { view } = this.props.stores

    let title;
    switch (view.leftView) {
      case view.views.chatroomList:
        title = "Chats"
        break;
      case view.views.friendList:
        title = "Friends"
        break;
      case view.views.option:
        title = "More"
        break;
      default:
        title = '';
    }
    return title;
  };

  render() {
    return (
      <div className="titleBarContainer">
        <div className="titleContainer">
          <Title title={this._renderTitle()}/>
        </div>
        <div className="buttonContainer">
          <Btn btnName={this.state.firstBtn} />
          <Btn btnName={this.state.secondBtn} />
          <Btn btnName={this.state.thirdBtn} />
        </div>
      </div>
    )
  }
}

export default TitleBar;
