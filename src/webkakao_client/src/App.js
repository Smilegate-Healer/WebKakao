import React, { Component } from "react";
import "./styles.scss";
import { hot } from "react-hot-loader/root";
import LoginPage from "./pages/LoginPage";
import { Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { inject, observer } from "mobx-react";
import { CssBaseline, CircularProgress } from "@material-ui/core";

@inject("stores")
@observer
class App extends Component {
  _renderLoadingPage = () => {
    if (this.props.stores.view.isLoading) {
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

  _renderContent = () => {
    const { view, user } = this.props.stores
    if(user.userInfo) {
      if(view.isLoading) {
        return this._renderLoadingPage()
      } else {
        return <MainPage/>
      }
    } else {
      return <LoginPage/>
    }
  }

  render() {
    return (
      <div className="root">
        <CssBaseline />
        {/* <Route path="/" render={(props) => this._renderContent(props)} /> */}
        {this._renderContent()}
      </div>
    );
  }
}

export default hot(App);
