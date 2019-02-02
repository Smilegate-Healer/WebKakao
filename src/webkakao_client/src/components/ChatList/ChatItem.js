import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

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
            {chat.sender}
          </div> 
          <div>
            {chat.msg}
          </div>
        </div>

        <div className="timeContainer">
            {chat.timestamp}
        </div>
      </div>
    )
  }
}

ChatItem.propTypes = {
  chat: PropTypes.object,
}


export default ChatItem