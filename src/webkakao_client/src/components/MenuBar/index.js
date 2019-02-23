import React from "react";
import { Component } from "react";
import "./MenuBar.scss";
import {
  Tabs,
  Tab,
} from '@material-ui/core'
import {
  PersonOutline,
  MessageOutlined,
  MoreHorizOutlined
} from '@material-ui/icons'
import { inject, observer } from "mobx-react";

@inject("stores")
@observer
class MenuBar extends Component {
  _onClickButton = (value) => {
    const { view, chatroom, user } = this.props.stores;
    view.resetSearchTargerStr();
    switch (value) {
        case 0:
            view.showFriendsList(value);
            chatroom.showAllChatroomList();
            break;
        case 1:
            view.showChatroomList(value);
            user.showAllFriendList();
            break;
        case 2:
            view.showMore(value);
            // user.showAllFriendList();
            // chatroom.showAllChatroomList();
            break;
        default:
        alert('Error in MenuBar');
    }
  }


  render() {
    return(
      <div className="menuContainer">
        <Tabs
          value={this.props.stores.view.menuBarIdx}
          onChange={(e, v) => this._onClickButton(v)}
          variant="fullWidth"
          classes={{
            root: "tabs",
            indicator: "indicator"
          }}>
          <Tab className="tab" icon={<PersonOutline/>} classes={{
            selected: "selected" 
          }}/>
          <Tab className="tab" icon={<MessageOutlined/>} classes={{
            selected: "selected"
          }}/>
          <Tab className="tab" icon={<MoreHorizOutlined/>} classes={{
            selected: "selected"
          }}/>
        </Tabs>
      </div>
    )
  }

}

export default MenuBar;
