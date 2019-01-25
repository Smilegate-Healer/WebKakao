import React from 'react'
import './styles.scss'

class ChatItem extends React.Component {

  render() {
    const { chat } = this.props

    return(
      <div className="ChatItem">
        <div className="profileContainer">
          base 64
        </div>

        <div className="senderMsgContainer">
          <div>
            {/* {chat.sender} */}
            {chat.userId}
          </div> 
          <div>
            {chat.msg}
          </div>
        </div>

        <div className="timeContainer">
            {chat.time}
        </div>
      </div>
    )
  }
}

export default ChatItem