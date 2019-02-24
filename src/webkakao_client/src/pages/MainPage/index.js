import React, { Component } from "react";
import "./styles.scss";
import LeftContainer from "../../container/LeftContainer";
import RightContainer from "../../container/RightContainer";
import { observer, inject } from "mobx-react";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import UserInfoModal from "../../components/Modal/UserInfoModal";
import UserSearchModal from "../../components/Modal/UserSearchModal";
import UserListModal from "../../components/Modal/UserListModal";
import RenameChatroomModal from "../../components/Modal/RenameChatroomModal";
import LoginPage from "../LoginPage";
import { Route, Redirect, withRouter } from 'react-router-dom'


@inject("stores")
@observer
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.props.stores.view.showPollingMessage 
      = this.props.stores.view.showPollingMessage.bind(this);
    this.props.stores.view.notificationDOMRef = React.createRef();
  }

  onClickNotification(e) {
    this.props.stores.view.showChatroom(
      this.props.stores.view.getNotificationChatroomIdx()
    );
  }

 

  _renderMain = () => {
    return (
      <div className="root">
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
    )
  }

  render() {
    return (
      <div className="root">
        {this._renderMain()}
      </div>
    );
  }
}

export default MainPage
