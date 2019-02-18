import React from 'react'
import FriendItem from './FriendItem'
import { inject, observer } from 'mobx-react';
import Me from '../Me';
import { Divider } from '@material-ui/core'

@inject('stores')
@observer
class FriendList extends React.Component {

  _onProfileClick = (e, idx) => {
    alert('you click this profile image of the person ' + idx)
    e.stopPropagation()
  }

  onClick = (idx) => {
    const { user } = this.props.stores;
    const req = {
      user_idx: idx
    }
    user.getUserInfo(req);
  }

  render() {

    const userList = this.props.stores.user.friendList;
    if (userList) {
      return (
        <div className={`${this.props.className}`}>
          <Me isFriendList/>
          <Divider variant="middle"/>
          {
            userList.map((v, idx) =>
              <FriendItem
                user={v}
                key={v.name}
                onClick={e => this.onClick(e, idx)}
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


export default FriendList