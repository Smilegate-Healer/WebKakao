import React from 'react'
import "./styles.scss"
import ChatBarBtn from './ChatBarBtn';
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

class ChatBar extends React.Component {

  static defaultProps = {
    chatroomName: "카카오페이"
  }

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
        <div className="backButtonContainer">
          <ChatBarBtn type="arrowback" onClick={this._onArrowbackBtnClick}/>
        </div>
        <div className="nameContainer">
          <Typography variant="h6" >
            {this.props.chatroomName}
          </Typography>
        </div>
        <div className="rightButtonsContainer">
          <ChatBarBtn type="search" onClick={this._onSearchBtnClick}/>
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