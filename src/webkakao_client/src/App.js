import React, { Component } from 'react';
import './styles.scss'
import LeftContainer from './container/LeftContainer';
import RightContainer from './container/RightContainer';
import { observer, inject } from 'mobx-react';
import { CssBaseline } from '@material-ui/core';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

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
    debugger;
    this.props.stores.view.showChatroom(this.props.stores.view.getNotificationChatroomIdx());
  }

  render() {
    return (
      <div className="root">
        <ReactNotification ref={this.props.stores.view.notificationDOMRef} onClick={this.onClickNotification} />
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

export default App;
