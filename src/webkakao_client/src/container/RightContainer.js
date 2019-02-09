import React from "react";
import { Component } from "react";
import "./Container.scss";
import ChatList from "../components/ChatList";
import ChatBar from "../components/ChatBar";
import ChatInput from "../components/ChatInput";
import { Divider } from "@material-ui/core";
import { inject, observer } from "mobx-react";

@inject("stores")
@observer
class RightContainer extends Component {

  _renderChatList = () => {
    return (
      <div className="RightContainer">
        <div className="chatBarContainer">
          <ChatBar />
        </div>
        <Divider />
        <div className="chatListContainer">
          <ChatList />
        </div>
        <div className="chatInputContainer">
          <ChatInput />
        </div>
      </div>
    )
  }

  _renderDefault = () => {
    return (
      <div className="RightContainer Default">
      </div>
    );
  };

  render() {
    const { rightView, views } = this.props.stores.view;
    switch (rightView) {
      case views.chatList:
        return this._renderChatList();
      default:
        return this._renderDefault();
    }
  }
}

export default RightContainer;
