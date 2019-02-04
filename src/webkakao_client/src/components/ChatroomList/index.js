import React from "react";
import ListItem from "./ListItem";
import "./styles.scss";
import { inject, observer } from "mobx-react";

@inject("stores")
@observer
class ChatroomList extends React.Component {
  _onItemClick = (e, idx) => {
    alert("You click the chatroom -> open the chatroom " + idx);
  };

  _onLogoClick = (e, idx) => {
    alert("on logo click of " + idx);
    e.stopPropagation(); // only for children click event
  };

  _renderItem = (v, idx) => {
    v = undefined // TODO: 

    // TODO: Complete the logic of making list item
    
    return (
              key={v.chatroom_idx} 
      <ListItem
        item={v}
        key={idx}
        onClick={e => this._onItemClick(e, idx)}
        onLogoClick={e => this._onLogoClick(e, idx)}
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
