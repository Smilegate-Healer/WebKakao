import React from "react";
import { Component } from "react";
import "./Container.scss";
import ChatList from "../components/ChatList";
import ChatBar from "../components/ChatBar";
import ChatInput from "../components/ChatInput";
import { Divider } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import EditProfilePage from "../components/EditProfilePage"
import Ryan from "../resources/settingImgLoading4@2x.png"

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
        <img
          src={Ryan}
          alt="Ryan"
          className="img"
        />
      </div>
    );
  };

  render() {
    const { rightView, views } = this.props.stores.view;
    switch (rightView) {
      case views.chatList:
        return this._renderChatList();
      case views.editProfilePage:
        return (
          <div className="RightContainer Default">
            <EditProfilePage/>
          </div>
        )
      default:
        return this._renderDefault();
    }
  }
}

export default RightContainer;
