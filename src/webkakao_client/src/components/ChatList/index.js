import React from 'react'
import ChatItem from './ChatItem'
import './styles.scss'

class ChatList extends React.Component {

  render() {
    return (
      <div className="List">
        {
          this.props.chats.map((v, idx) => 
            <ChatItem
              chat={v}
              key={v.time}
            />
          )
        }
      </div>
    )
  }
}

ChatList.defaultProps = {
  // 가장 최근 메시지가 가장 끝에 위치하도록 구성
  chats: [
    {
      sender: "카카오내비",
      msg: "[개인정보 이용내역 안내]\n항상 카카오모빌리티 서비스를 이용해주셔서 감사합니다.\n카카오모빌리티에서는 정보통신망법에 따라 연 1회 이상 회원님의 개인정보 이용내역을 안내해 드리고 있습니다.",
      time: "1"
    },
    {
      sender: "카카오내비",
      msg: "안녕하세요! 카카오내비 플친 '서비스 가이드 봇' 입니다.\n카카오내비 서비스에 대해 궁금하신 사항이 있으신 경우 대화창에 [시작]이라고 입력해주세요. 도움말을 제공해 드립니다.\n *서비스 가이드 봇은 전문 상담사가 연결된 상담톡 기능의 봇이 아닙니다. 양해부탁드립니다.",
      time: "2"
    }
  ]
}

export default ChatList