import React from "react";
import { Component } from "react";
import Title from "./Title";
import Btn from "./Btn";
import "./TitleBar.scss";
class TitleBar extends Component {
  state = {
    menu_type: "FriendList",
    title: "chat",
    firstBtn: "search",
    secondBtn: "new_talk",
    thirdBtn: "setting"
  };

  _renderTitle = () => {
    let title;
    switch (this.state.menu_type) {
      case "ChatroomList":
        title = "chat";
        break;
      case "FriendList":
        title = "friend";
        break;
      default:
        title = null;
    }
    return title;
  };

  // render() {
  //   return (
  //     <div className={`${this.props.className} titleContainer border}`}>
  //       <Title className="title_bar_title" title={this._renderTitle()} />
  //       <Btn className="title_bar_btn" btnName={this.state.firstBtn} />
  //       <Btn className="title_bar_btn" btnName={this.state.secondBtn} />
  //       <Btn className="title_bar_btn" btnName={this.state.thirdBtn} />
  //       {/* Btn<NewChatBtn className="price">{item.price}원</NewChatBtn>
  //               <SettingBtn className="price">{item.price}원</SettingBtn>
  //               <div className="count">{item.count}</div>
  //               <div className="return" onClick={() => onTake(item.name)}>갖다놓기 </div> */}
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="titleBarContainer">
        <div className="titleContainer">
          <Title title={this._renderTitle()}/>
        </div>
        <div className="buttonContainer">
          <Btn btnName={this.state.firstBtn} />
          <Btn btnName={this.state.secondBtn} />
          <Btn btnName={this.state.thirdBtn} />
        </div>
      </div>
    )
  }
}

export default TitleBar;
