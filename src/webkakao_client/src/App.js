import React, { Component } from 'react';
import './styles.scss'
import LeftContainer from './container/LeftContainer';
import RightContainer from './container/RightContainer';
import { observer, inject } from 'mobx-react';
import { throws } from 'assert';
import axios from 'axios';

@inject(({ stores }) => (
  { initChatroomList: stores.chatroom.initChatroomList,
    initFriendList: stores.user.initFriendList }))
@observer
class App extends Component {

  constructor(props) {
    super(props);

    axios.post('http://127.0.0.1:8080/api/friend/list', {"user_idx":1 })
    .then(response => { 
        console.log(response);
        if (response.data.resultCode === 0) {
          this.props.initFriendList(response.data.param.list);
        }
    })
    .catch(function (error) {
        alert("Authorize Server is dead");
        // props.history.push('/');
    });

    axios.post('http://127.0.0.1:8080/api/chatroom/list', {"user_idx":1 })
    .then(response => { 
        console.log(response);
        if (response.data.resultCode === 0) {
          this.props.initChatroomList(response.data.param.list);
        }
    })
    .catch(function (error) {
        alert("Authorize Server is dead");
        // props.history.push('/');
    });

  }

  render() {
    return (
      <div className="root">
        <div className="leftContainer">
          <LeftContainer/>
        </div>
        <div className="rightContainer">
          <RightContainer/>
        </div>
      </div>
    );
  }
}

export default App;
