import React from 'react'
import ChatItem from './ChatItem'
import './styles.scss'
import { inject, observer } from "mobx-react"
import SideMenu from './SideMenu';
import InfiniteScroll from 'react-infinite-scroller';

@inject("stores")
@observer
class ChatList extends React.Component {
  _scrollToBottom = () => {
    this.div.scrollTop = this.div.scrollHeight // to scroll bottom
  }

  componentDidUpdate() {
    // this._scrollToBottom()
  }

  _renderItems = () => {
    const { view, chatroom, user } = this.props.stores

    if(!view.selectedChatroom || !chatroom.chats[view.selectedChatroom]) return 
    
    return chatroom.chats[view.selectedChatroom].data.map((v, idx) => {

      return (
        <ChatItem
          chat={v}
          key={v.msg_idx}
          isMine={v.sender === user.userInfo.user_idx}
        />
      )
    })
  }

  loadFunc = () => {
    const { view, chatroom } = this.props.stores;
    if(chatroom.chats[view.selectedChatroom]) {
      chatroom.getChatroomScrollMessage(view.selectedChatroom); 
    }
  }


  render() {
    return (
      <div className="List" ref={ref => this.div = ref}>
        <InfiniteScroll
        pageStart={0}
        loadMore={this.loadFunc}
        isReverse={true}
        hasMore={true || false}
        // loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}>
        {this._renderItems()}
        </InfiniteScroll>
        <SideMenu/>
      </div>
    )
  }
}

export default ChatList
