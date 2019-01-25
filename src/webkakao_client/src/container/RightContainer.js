import React from "react";
import { Component } from "react";
import "./Container.scss";
import ChatList from '../components/ChatList'
import ChatBar from "../components/ChatBar";
import ChatInput from "../components/ChatInput";

class RightContainer extends Component {
  state = {
    menu_type: "ChatroomList"
  };

  render() {
    return (
      <div className="RightContainer">
        <ChatBar/>
        <ChatList/>
        <ChatInput/>
      </div>
    )
  }
}

export default RightContainer;
