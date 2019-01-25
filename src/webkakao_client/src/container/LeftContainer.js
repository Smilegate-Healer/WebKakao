import React from "react";
import { Component } from "react";
import TitleBar from "../components/TitleBar/index";
import "./Container.scss";
import MenuBar from "../components/MenuBar/index";
import ChatroomList from "../components/ChatroomList";
import FriendList from "../components/FriendList"
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
class LeftContainer extends Component {
  
  _renderFunc() {
    const { leftView } = this.props.stores.view;
    if( leftView === 'ChatroomList') {
      return (<ChatroomList />);
    } else if( leftView === 'FriendList') {  
      return (<FriendList />);
    }
  }

  render() {
    const leftList = this._renderFunc();
    return (
      <div className="LeftContainer">
        <MenuBar  />
        <TitleBar  />
        {leftList}
        {/* <FriendList /> */}
      </div>
    );
  }
}

export default LeftContainer;
