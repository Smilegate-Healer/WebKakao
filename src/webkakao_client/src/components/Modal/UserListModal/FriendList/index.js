import React from 'react'
import FriendItem from './FriendItem'
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
class FriendList extends React.Component {

  render() {
    const userList = this.props.stores.view.searchUserList;
    if (userList) {
      return (
        <div className="container">
          {
            userList.map((v, idx) =>
              <FriendItem
                user={v}
                key={v.name}
              />
            )
          }
        </div>
      )
    } else {
      return null
    }
  }
}


export default FriendList