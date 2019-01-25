import React from 'react'
import "./styles.scss"
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import SendBtn from './SendBtn';
import { TextField } from '@material-ui/core'

var sock = new SockJS("/gs-guide-websocket")
var stompClient = Stomp.over(sock)

stompClient.connect({}, frame => {
  console.log('conneted to the socket')
  stompClient.subscribe("/topic/chatroom/1234", (msg) => {
    console.log(msg)
  })
})

class ChatInput extends React.Component {

  state = {
    inputText: ''
  }

  _onClickSendBtn = e => {
    stompClient.send("/chat/1234", JSON.stringify({
      userId: "i am user id", 
      msg: this.state.inputText,
      type: "plain"
    })) 

    // flush the input
    this.setState({
      inputText: ''
    })
  }

  _onEnter = e => {
    if(e.key === 'Enter') {
      if(this.state.inputText === '') return 
      this._onClickSendBtn()
    }
  }  

  _onInputChange = e => {
    this.setState({
      inputText: e.target.value
    })
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="ChatInputContainer">
        <TextField 
          className="input"
          variant="outlined"
          margin="dense"
          onChange={this._onInputChange}
          onKeyPress={this._onEnter}
          value={this.state.inputText}
        />

        <div className="sendBtn">
          <SendBtn
            onClick={this._onClickSendBtn}
          />
        </div>
      </div>
    )
  }
}

export default ChatInput