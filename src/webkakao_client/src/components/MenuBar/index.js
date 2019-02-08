import React from "react";
import { Component } from "react";
import Btn from "./Btn";
import "./MenuBar.scss";
import {
  Paper, 
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
    switch (value) {
        case 0:
            this.props.stores.view.showFriendsList(value);
            break;
        case 1:
            this.props.stores.view.showChatroomList(value);
            break;
        case 2:
            this.props.stores.view.showOption(value);
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
          indicatorColor="primary"
          textColor="primary">
          <Tab className="tab" icon={<PersonOutline/>}></Tab>
          <Tab className="tab" icon={<MessageOutlined/>}></Tab>
          <Tab className="tab" icon={<MoreHorizOutlined/>}></Tab>
        </Tabs>
      </div>
    )
  }

}

export default MenuBar;
