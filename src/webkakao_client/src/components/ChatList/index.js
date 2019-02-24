import React from 'react'
import ChatItem from './ChatItem'
import './styles.scss'
import { inject, observer } from "mobx-react"
import SideMenu from './SideMenu';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress, Typography } from "@material-ui/core"
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Waypoint } from 'react-waypoint'
import { Divider } from '@material-ui/core'

@inject("stores")
@observer
class ChatList extends React.Component {
  state = {
    scrollLoad: false
  }
  
  _scrollToBottom = () => {
    this.div.scrollTop = this.div.scrollHeight // to scroll bottom
  }
  componentWillUpdate() {
    console.log(this.div.scrollTop) 
    console.log(this.div.scrollHeight) 
    this.div.onscroll = (e) => console.log(this.div.scrollTop,  this.div.scrollHeight)
  }


  componentDidUpdate = () => {
    console.log('componentdidupdate')
    const { chatroom, view } = this.props.stores;
    chatroom.endLoading();
    const check = view.scrollCheck();
    if(check === 0) {
      this._scrollToBottom()
    }    
    if(view.checkEnterKeyPress()) {
      this._scrollToBottom()
      view.completeEnterKeyPressed();
    }

    if(this.state.scrollLoad && this.div.scrollHeight > this.state.beforeLoadScrollHeight) {
      console.log('scrolload is true')
      this.setState({
        scrollLoad: false
      }, () => {
        console.log('scroll to back')
        console.log(this.state)
        console.log(this.div.scrollHeight)
        this.div.scrollTop = this.div.scrollHeight - this.state.beforeLoadScrollHeight
      })
    }
  }

  _renderItems = () => {

    const { view, chatroom, user } = this.props.stores

    if(!view.selectedChatroom || 
      !chatroom.chats[view.selectedChatroom] || 
      !chatroom.chats[view.selectedChatroom].data ||
      chatroom.chats[view.selectedChatroom].data.length === 0) return 

    return chatroom.chats[view.selectedChatroom].data.map((v, idx) => {
      return (
        <ChatItem
          chat={v}
          key={`${view.selectedChatroom}_${v.msg_idx}`}
          isMine={v.sender === user.userInfo.user_idx}
        />
      )
    })
  }

  loadFunc = () => {
    console.debug("on enter waypoint")
    const { view, chatroom } = this.props.stores;
    const hasMore = !this.props.stores.chatroom.isLoading;
    if(chatroom.chats[view.selectedChatroom] 
      && chatroom.chats[view.selectedChatroom].data 
      && chatroom.chats[view.selectedChatroom].data.length !== 0) {
      if(hasMore && chatroom.chats[view.selectedChatroom].pre_object_id !== "null") {
        this.setState({
          scrollLoad: true,
          beforeLoadScrollHeight: this.div.scrollHeight
        }, () => {
          chatroom.getChatroomScrollMessage(view.selectedChatroom)
        })
      }
    }
  }

  _renderStartOfMessage = () => {
    const { chatroom, view } = this.props.stores
    if(chatroom.chats[view.selectedChatroom] 
      && chatroom.chats[view.selectedChatroom].pre_object_id === 'null') {
      return (
        <div className="first"/>
      )
    }

  }

  render() {
    var items = this._renderItems()
    return (
      <div 
        className="List"
        ref={ref => this.div = ref}
      >
        {/* {this._renderStartOfMessage()} */}
        <Waypoint
          onEnter={this.loadFunc}
        />
        {items}
        <SideMenu/>
      </div>
    )
  }
}

export default ChatList
