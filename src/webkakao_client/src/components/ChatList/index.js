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
  // componentWillUpdate() {
  //   this._scrollToBottom()
  // }

  componentDidUpdate = () => {
    const { chatroom, view } = this.props.stores;
    chatroom.endLoading();
    if(view.checkEnterKeyPress()) {
        this._scrollToBottom()
        view.completeEnterKeyPressed();
    }
  }

  _renderItems = () => {
    const { view, chatroom, user } = this.props.stores

    if(!view.selectedChatroom || 
      !chatroom.chats[view.selectedChatroom] || 
      !chatroom.chats[view.selectedChatroom].data ||
      chatroom.chats[view.selectedChatroom].data.length === 0) return 
    debugger;
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
    if(chatroom.chats[view.selectedChatroom] && chatroom.chats[view.selectedChatroom].data && chatroom.chats[view.selectedChatroom].data.length !== 0) {
      debugger;
      if(!chatroom.isLoading && !(chatroom.chats[view.selectedChatroom].pre_object_id === "null")) {
        chatroom.getChatroomScrollMessage(view.selectedChatroom); 
      }
    }
  }

  render() {
    const hasMore = !this.props.stores.chatroom.isLoading;
    return (
      <div className="List" ref={ref => this.div = ref}>
        <InfiniteScroll
        pageStart={0}
        loadMore={this.loadFunc}
        isReverse={true}
        hasMore={hasMore}
        threshold={50}
        initialLoad={true}
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
