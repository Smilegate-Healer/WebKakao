import React from 'react'
import "./styles.scss"
import ChatBarBtn from './ChatBarBtn';
import { Typography } from '@material-ui/core'

class ChatBar extends React.Component {

  // TODO: complete logic with mobx
  _onArrowbackBtnClick = e => {
    alert('back button click')
  }

  _onSearchBtnClick = e => {
    alert("serach button click")
  }

  _onMenuBtnClick = e => {
    alert("menu button click")
  }


  render() {
    return (
      <div className="ChatBar">
        <div>
          <ChatBarBtn type="arrowback" onClick={this._onArrowbackBtnClick}/>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            카카오페이
          </Typography>
        </div>
        <div>
          <ChatBarBtn type="search" onClick={this._onSearchBtnClick}/>
          <ChatBarBtn type="menu" onClick={this._onMenuBtnClick}/>
        </div>
      </div>
    )
  }
}

export default ChatBar