import React from "react";
import { Component } from "react";
import "./Container.scss";
import ChatList from '../components/ChatList'
import ChatBar from "../components/ChatBar";
import ChatInput from "../components/ChatInput";
import { Divider } from '@material-ui/core'

class RightContainer extends Component {
  state = {
    menu_type: "ChatroomList"
  };

  render() {
    return (
      <div className="RightContainer">
        <div className="chatBarContainer">
          <ChatBar/>
        </div>
        <Divider/>
        <div className="chatListContainer">
          <ChatList/>
        </div>
        <div className="chatInputContainer">
          <ChatInput/>
        </div>
      </div>
    )
  }
}

export default RightContainer;
