import React from 'react'
import FriendItem from './FriendItem'
class FriendList extends React.Component {

  render() {
    return (
      <div>
        {this.props.friends.map((v, idx) => <FriendItem info={v} key={v.name}/>)}
      </div>
    )
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