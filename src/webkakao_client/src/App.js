import React, { Component } from "react";
import "./styles.scss";
import LeftContainer from "./container/LeftContainer";
import RightContainer from "./container/RightContainer";
import { observer, inject } from "mobx-react";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import UserInfoModal from "./components/Modal/UserInfoModal";
import { hot } from "react-hot-loader/root";
import UserSearchModal from "./components/Modal/UserSearchModal";
import UserListModal from "./components/Modal/UserListModal";
import SignIn from "./components/SignIn";
import RenameChatroomModal from "./components/Modal/RenameChatroomModal";

@inject("stores")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.props.stores.view.showPollingMessage = this.props.stores.view.showPollingMessage.bind(
      this
    );
    this.props.stores.view.notificationDOMRef = React.createRef();
  }
  onClickNotification(e) {
    this.props.stores.view.showChatroom(
      this.props.stores.view.getNotificationChatroomIdx()
    );
  }

  _renderLoadingPage = () => {
    if (this.props.stores.chatroom.isConnected === false || this.props.stores.user.isLogin === false) {
      return (
        <div
          className="loading"
          onClick={e => {
            e.stopPropagation(); // disable click through this div
          }}>
          <CircularProgress className="progress" size={60} />
        </div>
      );
    }
  };

  _randerFunc = () => {
    const { user } = this.props.stores;
    if (user.isLogin) {
      return (
        <div className="root">
          {this._renderLoadingPage()}
          <ReactNotification
            ref={this.props.stores.view.notificationDOMRef}
            onClick={this.onClickNotification}
          />
          <UserSearchModal />
          <UserListModal />
          <UserInfoModal />
          <RenameChatroomModal />
          <CssBaseline />
          <div className="leftContainer">
            <LeftContainer />
          </div>
          <div className="rightContainer">
            <RightContainer />
          </div>
        </div>
      );
    } else {
      return (
        <div className="root">
          <SignIn />
        </div>
      );
    }
  };

  render() {
    const component = this._randerFunc();
    return (
      <div className="root">
        {component}
        {/* {this._renderLoadingPage()}
        <ReactNotification ref={this.props.stores.view.notificationDOMRef} onClick={this.onClickNotification} />
        <UserSearchModal />
        <UserListModal />
        <UserInfoModal />
        <RenameChatroomModal />
        <CssBaseline />
        <div className="leftContainer">
          <LeftContainer />
        </div>
        <div className="rightContainer">
          <RightContainer />
        </div> */}
      </div>
    );
  }
}

export default hot(App);
