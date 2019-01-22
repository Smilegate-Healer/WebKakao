import React from "react";
import { Component } from "react";
import "./Container.scss";
import ChatList from '../components/ChatList'

class RightContainer extends Component {
  state = {
    menu_type: "ChatroomList"
  };

  render() {
    return (
      <div className="RightContainer">
        <ChatList/>
      </div>
    )
  }
}

export default RightContainer;
