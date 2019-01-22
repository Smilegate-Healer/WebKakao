import React from "react";
import { Component } from "react";
import TitleBar from "../components/TitleBar/index";
import "./Container.scss";
import MenuBar from "../components/MenuBar/index";
import ChatroomList from "../components/ChatroomList";

class LeftContainer extends Component {
  state = {
    menu_type: "ChatroomList"
  };

  _renderTitle = () => {
    if (this.state.men === "ChatroomList") return <span />;
  };

  render() {
    return (
      <div className="LeftContainer">
        <MenuBar className="menuBar" />
        <TitleBar className="titleBar" />
        <ChatroomList className="chatroomList" />
      </div>
    );
  }
}

export default LeftContainer;
