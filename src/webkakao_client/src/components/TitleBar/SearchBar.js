import React from "react";
import { Component } from "react";
import { InputBase } from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons"
import CloseBtn from "./CloseBtn";
import * as hangul from "hangul-js";
import { observer, inject } from "mobx-react";
import "./TitleBar.scss"

@inject("stores")
@observer
class SearchBar extends Component {
  state = {
    timer: null
  };

  _onExit = e => {
    if (e.keyCode === 27) {
      this._onCloseBtnClick();
    }
  };

  _onInputChange = e => {
    const { view } = this.props.stores;
    view.setSearchTargerStr(e.target.value);

    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }
    this.setState({
      timer: setTimeout(
        () => {
          this._onSearch();
        },
        200
      )
    });
  };

  _onSearch = () => {
    const { view, chatroom, user } = this.props.stores;
    const searchTargerStr = view.searchTargerStr;

    if (searchTargerStr === "") {
      switch (view.leftView) {
        case view.views.friendList:
          user.showAllFriendList();
          break;
        case view.views.chatroomList:
          chatroom.showAllChatroomList();
          break;
        case view.views.option:
          break;
        default:
          break;
      }
      return;
    }

    switch (view.leftView) {
      case view.views.friendList:
        const friendList = this.props.stores.user.friendList;
        for (var i = 0; i < friendList.length; i++) {
          if (hangul.search(friendList[i].name, searchTargerStr) < 0) {
            friendList[i].hide = true;
          } else {
            friendList[i].hide = false;
          }
        }
        break;
      case view.views.chatroomList:
        const chatroomList = this.props.stores.chatroom.chatroomList;
        for (var i = 0; i < chatroomList.length; i++) {
          const chatroomName = chatroom.getChatroomName(
            chatroomList[i].chatroom_idx
          );
          if (hangul.search(chatroomName, searchTargerStr) < 0) {
            chatroomList[i].hide = true;
          } else {
            chatroomList[i].hide = false;
          }
        }
        break;
      case view.views.option:
        break;
      default:
        break;
    }
  };

  _onCloseBtnClick = () => {
    const { view, chatroom, user } = this.props.stores;

    view.hideSearchBar();

    switch (view.leftView) {
      case view.views.friendList:
        user.showAllFriendList();
        break;
      case view.views.chatroomList:
        chatroom.showAllChatroomList();
        break;
      case view.views.option:
        break;
      default:
        break;
    }
  };

  _randerFunc = () => {
    const { view } = this.props.stores;
    if (view.isSearchBar === false) {
      return null;
    } else {
      return (
        <div className="search">
          <InputBase
            className="input"
            margin="dense"
            onChange={this._onInputChange}
            onKeyDown={this._onExit}
            value={view.searchTargerStr}
            autoFocus={true}
            classes={{
              input: "text"
            }}
            startAdornment={<SearchOutlined />}
          />
          <CloseBtn onClick={this._onCloseBtnClick} />
        </div>
      );
    }
  };

  render() {
    const components = this._randerFunc();
    return <div>{components}</div>;
  }
}

export default SearchBar;
