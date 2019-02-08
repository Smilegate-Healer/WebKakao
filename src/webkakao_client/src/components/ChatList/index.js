import React from 'react'
import ChatItem from './ChatItem'
import './styles.scss'
import { inject, observer } from "mobx-react"

@inject("stores")
@observer
class ChatList extends React.Component {

  _renderItems = () => {
    const { view, chatroom } = this.props.stores

    if(!view.selectedChatroom || !chatroom.chats[view.selectedChatroom]) return 
    
    return chatroom.chats[view.selectedChatroom].data.map((v, idx) => {
      var isMine = idx%2 === 0 ? true : false

      return (
        <ChatItem
          chat={v}
          key={idx}
          isMine={isMine}
        />
      )
    })
  }

  render() {
    return (
      <div className="List">
        { this._renderItems()}
      </div>
    )
  }
}

export default ChatList
