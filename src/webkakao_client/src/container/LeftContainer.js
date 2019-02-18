import React from "react";
import { Component } from "react";
import TitleBar from "../components/TitleBar/index";
import "./Container.scss";
import MenuBar from "../components/MenuBar/index";
import ChatroomList from "../components/ChatroomList";
import FriendList from "../components/FriendList"
import { inject, observer } from 'mobx-react';
import { Divider } from '@material-ui/core'
import More from '../components/More'

@inject('stores')
@observer
class LeftContainer extends Component {
  
  _renderFunc() {
    const { leftView, views } = this.props.stores.view;

    switch(leftView) {
      case views.chatroomList: return <ChatroomList/>
      case views.friendList: return <FriendList/>
      case views.more: return <More/>
      default:
        return null
    }  
  }

  render() {
    const leftList = this._renderFunc();
    return (
      <div className="LeftContainer">
        <div className="titleBar">
          <TitleBar/>
        </div>
        <div className="list">
          {leftList}
        </div>
        <Divider/>
        <div className="menuBar">
          <MenuBar/>
        </div>
      </div>
    );
  }
}

export default LeftContainer;
