import React from 'react'
import FriendItem from './FriendItem'
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
class FriendList extends React.Component {

  _onItemClick = (e, idx) => {
    alert('you click this person ' + idx)
  }

  _onProfileClick = (e, idx) => {
    alert('you click this profile image of the person ' + idx)
    e.stopPropagation()
  }

  render() {

    const userList = this.props.stores.user.friendList;
    if (userList) {
      return (
        <div className={`${this.props.className}`}>
          {
            userList.map((v, idx) =>
              <FriendItem
                user={v}
                key={v.name}
                onClick={e => this._onItemClick(e, idx)}
                onProfileClick={e => this._onProfileClick(e, idx)}
              />
            )
          }
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

FriendList.defaultProps = {
  friends: [
    {
      name: "홍길동",
      profileImg: "base64",
      statusMsg: "나의 상태"
    },
    {
      name: "홍길동",
      profileImg: "base64",
      statusMsg: "나의 상태"
    },
    {
      name: "홍길동",
      profileImg: "base64",
      statusMsg: "나의 상태"
    },
    {
      name: "홍길동",
      profileImg: "base64",
      statusMsg: "나의 상태"
    },
    {
      name: "홍길동",
      profileImg: "base64",
      statusMsg: "나의 상태"
    },
  ]
}

export default FriendList