import React, { Component } from 'react';
import './styles.scss'
import LeftContainer from './container/LeftContainer';
import RightContainer from './container/RightContainer';
import { observer, inject } from 'mobx-react';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import UserInfoModal from './components/Modal/UserInfoModal';
import { hot } from 'react-hot-loader/root'
import UserSearchModal from './components/Modal/UserSearchModal';

@inject("stores")
@observer
class App extends Component {

  constructor(props) {
    super(props);
    this.props.stores.view.showPollingMessage = this.props.stores.view.showPollingMessage.bind(this);
    this.props.stores.view.notificationDOMRef = React.createRef();
  }

  componentWillMount() {
    this.props.stores.user.login() // TODO: Test
    this.props.stores.user.getFriendList()
    this.props.stores.user.getChatroomList()
  }

  onClickNotification(e){
    this.props.stores.view.showChatroom(this.props.stores.view.getNotificationChatroomIdx());
  }

  _renderLoadingPage = () => {

    if(this.props.stores.chatroom.isConnected === false) {

      return (
        <div className="loading" onClick={e => {
          e.stopPropagation() // disable click through this div
        }}>
          <CircularProgress className="progress" size={60}/>
        </div>
      ) 
    }
  }

  render() {
    return (
      <div className="root">
        {this._renderLoadingPage()}
        <ReactNotification ref={this.props.stores.view.notificationDOMRef} onClick={this.onClickNotification} />
        <UserSearchModal/>
        <UserInfoModal/>
        <CssBaseline/>
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


export default hot(App);
