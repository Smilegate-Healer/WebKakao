import React from 'react'
import ListItem from './ListItem';
import './styles.scss'
import axios from '../../util/api';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
class ChatroomList extends React.Component {

  _onItemClick = (e, idx) => {
    alert('You click the chatroom -> open the chatroom ' + idx)
  }

  _onLogoClick = (e, idx) => {
    alert('on logo click of ' + idx)
    e.stopPropagation() // only for children click event 
  }

  render() {
    const list = this.props.stores.chatroom.chatroomList;
    if(list) {
    return (
      
      <div className="List">
          {list.map((v, idx) => 
            <ListItem 
              item={v} 
              key={v.name} 
              onClick={e => this._onItemClick(e, idx)}
              onLogoClick={e => this._onLogoClick(e, idx)}
              />
          )}
          {/* {this.props.chatrooms.map((v, idx) => 
            <ListItem 
              item={v} 
              key={v.name} 
              onClick={e => this._onItemClick(e, idx)}
              onLogoClick={e => this._onLogoClick(e, idx)}
              />
          )} */}
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
} 
}
}



ChatroomList.defaultProps = {
  chatrooms: [
    {
      name: "홈픽",
      latestMsg: "You have a new message.",
      date: "1",
      logo: "base64"
    },
    {
      name: "그린카",
      latestMsg: "You have a new message.",
      date: "2",
      logo: "base64"
    },
    {
      name: "배달의민족",
      latestMsg: "You have a new message.",
      date: "3",
      logo: "base64"
    },
    {
      name: "카카오내비",
      latestMsg: "안녕하세요! 카카오네비 플친 '서비스 가이드 봇' 입니다. 블라 블라 블라 해서 블라 블라 하니까 블라 블라 해주세요.",
      date: "4",
      logo: "base64"
    },
    {
      name: "김경민",
      latestMsg: "4,500원 받기 완료! 받은 돈은 송금 및 온/오프라인 결제에 사용할 수 있습니다.",
      date: "5",
      logo: "base64"
    },
    {
      name: "알라딘",
      latestMsg: "You have a new message.",
      date: "6",
      logo: "base64"
    },
    {
      name: "G마켓",
      latestMsg: "You have a new message.",
      date: "7",
      logo: "base64"
    }
  ]
}

export default ChatroomList