import React from 'react'
import "./styles.scss"
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import SendBtn from './SendBtn';
import { TextField, InputBase } from '@material-ui/core'
import { inject } from 'mobx-react'

// TODO: action으로 분리할 것
@inject("stores")
class ChatInput extends React.Component {

  componentDidMount(props) {
    var sock = new SockJS("/gs-guide-websocket")
    var stompClient = Stomp.over(sock)
    this.stompClient = stompClient
    
    this.stompClient.connect({}, frame => {
      console.log('conneted to the socket')
      stompClient.subscribe("/topic/chatroom/1", (msg) => {
        this.props.stores.chatroom.chats[1].push(JSON.parse(msg.body))
        console.log(msg)
      })
    })
  }

  state = {
    inputText: '',
    sender:  1
  }

  _onClickSendBtn = e => {
    this.stompClient.send("/chatroom/1", JSON.stringify({
      sender: this.state.sender === 1 ? 2 : 1,
      msg: this.state.inputText,
      msg_type: "m"
    })) 

    this.setState({
      sender: this.state.sender === 1 ? 2 : 1
    })

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


  render() {

    return (
      <div className="ChatInputContainer">
        <InputBase
          className="input"
          variant="outlined"
          margin="dense"
          onChange={this._onInputChange}
          onKeyPress={this._onEnter}
          value={this.state.inputText}
          endAdornment={<SendBtn onClick={this._onClickSendBtn}/>}
        />

        {/* <div className="sendBtn">
          <SendBtn
            onClick={this._onClickSendBtn}
          />
        </div> */}
      </div>
    )
  }
}

export default ChatInput