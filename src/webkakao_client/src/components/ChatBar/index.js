import React from 'react'
import "./styles.scss"
import ChatBarBtn from './ChatBarBtn';
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject("stores")
@observer
class ChatBar extends React.Component {

  static defaultProps = {
    chatroomName: "카카오페이"
  }

  _onArrowbackBtnClick = e => {
    const { view } = this.props.stores
    view.hideChatroom();
  }

  _onSearchBtnClick = e => {
    alert("serach button click")
  }

  _onMenuBtnClick = e => {
    const { view } = this.props.stores;
    view.showChatroomSideMenu();
  }

  getChatroomName() {
    const { view, chatroom } = this.props.stores
    let chatroomName = view.selectedChatroomName;
    if(!chatroomName) {
      chatroomName = chatroom.getChatroomName(view.selectedChatroom);
      if(chatroomName) {
        return chatroomName;
      } else {
        return '';
      }
    } else {
      return chatroomName;
    }
  }

  render() {
    const chatroomName = this.getChatroomName();
    return (
      <div className="ChatBar">
        <div className="backButtonContainer">
          <ChatBarBtn type="arrowback" onClick={this._onArrowbackBtnClick}/>
        </div>
        <div className="nameContainer">
          <Typography variant="h6" >
            {chatroomName}
          </Typography>
        </div>
        <div className="rightButtonsContainer">
          {/** TODO: Search */}
          {/* <ChatBarBtn type="search" onClick={this._onSearchBtnClick}/> */}
          <ChatBarBtn type="menu" onClick={this._onMenuBtnClick}/>
        </div>
      </div>
    )
  }
}


ChatBar.propTypes = {
  chatroomName: PropTypes.string.isRequired
}

export default ChatBar