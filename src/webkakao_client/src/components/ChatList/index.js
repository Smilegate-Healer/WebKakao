import React from 'react'
import ChatItem from './ChatItem'
import './styles.scss'
import { inject, observer } from "mobx-react"

@inject("stores")
@observer
class ChatList extends React.Component {

  render() {
    const { view, chatroom } = this.props.stores
    return (
      <div className="List">
        {
          chatroom.chats[view.selectedChatroom].map((v, idx) =>  {
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
      </div>
    )
  }
}

export default ChatList
