import React from "react";
import ListItem from "./ListItem";
import "./styles.scss";
import { inject, observer } from "mobx-react";

@inject("stores")
@observer
class ChatroomList extends React.Component {
  _onItemClick = (e, idx) => {
    this.props.stores.view.showChatroom(idx)
    const { view } = this.props.stores;
    view.enterKeyPressed();
  };

  _renderItem = (v, idx) => {
    return (
      <ListItem
        item={v}
        key={idx}
        onClick={e => this._onItemClick(e, v.chatroom_idx)}
      />
    )
  }

  render() {
    const { chatroomList } = this.props.stores.chatroom;
    return (
      <div className="List">
        {chatroomList.map((v, idx) => this._renderItem(v, idx))}
      </div>
    ) 
  }
}

export default ChatroomList;
