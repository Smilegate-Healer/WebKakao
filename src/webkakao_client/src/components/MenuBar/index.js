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
          classes={{root: "tabs"}}>
          <Tab className="tab" icon={<PersonOutline/>}/>
          <Tab className="tab" icon={<MessageOutlined/>}/>
          <Tab className="tab" icon={<MoreHorizOutlined/>}/>
        </Tabs>
      </div>
    )
  }

}

export default MenuBar;
