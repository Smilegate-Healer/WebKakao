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
    multiline: false
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
      inputText: '',
      multiline: false
    })
  }

  _onKeyPress = e => {
    if(e.key === "Enter" && e.shiftKey) {
      
      this.setState({
        inputText: (this.state.multiline) ? this.state.inputText : this.state.inputText + '\n',
        multiline: true,
      })
    } else if(e.key === 'Enter') {
      this._onClickSendBtn()
    }
  }

  _onInputChange = e => {
    this.setState({
      inputText: e.target.value
    })
  }

  _renderEndAdorment = () => {
    if(this.state.inputText !== '' ) {
      return <SendBtn onClick={this._onClickSendBtn}/>
    }
  }


  render() {

    return (
      <div className="ChatInputContainer">
        <InputBase
          className="input"
          margin="dense"
          onChange={this._onInputChange}
          onKeyPress={this._onKeyPress}
          value={this.state.inputText}
          endAdornment={this._renderEndAdorment()}
          multiline={this.state.multiline}
          autoFocus={true}
        />
      </div>
    )
  }
}

export default ChatInput