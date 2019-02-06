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
  // render() {
  //   return (
  //     <div className={`${this.props.className} menuContainer border`}>
  //       <Btn className="menuBarLogo" btnName="friendList" />
  //       <Btn className="menuBarLogo" btnName="chatroomList" />
  //       <Btn className="menuBarLogo" btnName="option" />
  //       {/* Btn<NewChatBtn className="price">{item.price}원</NewChatBtn>
  //       <SettingBtn className="price">{item.price}원</SettingBtn>
  //       <div className="count">{item.count}</div>
  //       <div className="return" onClick={() => onTake(item.name)}>갖다놓기 </div> */}
  //     </div>
  //   );
  // }

  state = {
    value: 0
  }

  onClickButton = (value) => {
    this.setState({value:value})
    switch (value) {
        case 0:
            this.props.stores.view.showFriendsList();
            break;
        case 1:
            this.props.stores.view.showChatroomList();
            break;
        case 2:
            this.props.stores.view.showOption();
            break;
        default:
        alert('default');
    }
  }

  render() {
    return(
      <div className="menuContainer">
        <Tabs
          value={this.state.value}
          onChange={(e, v) => this.onClickButton(v)}
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
