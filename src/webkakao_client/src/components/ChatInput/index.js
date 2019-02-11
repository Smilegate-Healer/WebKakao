import React from 'react'
import "./styles.scss"
import SendBtn from './SendBtn';
import { InputBase } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

// TODO: action으로 분리할 것
@inject("stores")
@observer
class ChatInput extends React.Component {

  state = {
    inputText: '',
  }

  _onClickSendBtn = e => {
    if(this.state.inputText === '') return

    const { chatroom, user, view } = this.props.stores
    chatroom.sendChat(view.selectedChatroom, {
      sender: user.userInfo.user_idx,
      msg: this.state.inputText,
      msg_type: "m"
    }) 

    // flush the input
    this.setState({
      inputText: ''
    })
  }

  _onEnter = e => {
    if(e.key === 'Enter') {
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
          margin="dense"
          onChange={this._onInputChange}
          onKeyPress={this._onEnter}
          value={this.state.inputText}
          endAdornment={<SendBtn onClick={this._onClickSendBtn}/>}
        />
      </div>
    )
  }
}

export default ChatInput