import React from 'react'
import ChatItem from './ChatItem'
import './styles.scss'
import { inject, observer } from "mobx-react"

@inject("stores")
@observer
class ChatList extends React.Component {
  _scrollToBottom = () => {
    this.div.scrollTop = this.div.scrollHeight // to scroll bottom
  }

  componentDidUpdate() {
    this._scrollToBottom()
  }

  _renderItems = () => {
    const { view, chatroom, user } = this.props.stores

    if(!view.selectedChatroom || !chatroom.chats[view.selectedChatroom]) return 
    
    return chatroom.chats[view.selectedChatroom].data.map((v, idx) => {

      return (
        <ChatItem
          chat={v}
          key={idx}
          isMine={v.sender === user.userInfo.user_idx}
        />
      )
    })
  }

  render() {
    return (
      <div className="List" ref={ref => this.div = ref}>
        { this._renderItems()}
      </div>
    )
  }
}

export default ChatList
