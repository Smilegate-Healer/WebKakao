import React, { Component } from 'react';
import './styles.scss'
import LeftContainer from './container/LeftContainer';
import RightContainer from './container/RightContainer';
import { observer, inject } from 'mobx-react';
import { CssBaseline } from '@material-ui/core';

@inject("stores")
@observer
class App extends Component {

  componentWillMount() {
    // this.props.stores.user.login() // TODO: Test
    // this.props.stores.user.getFriendList()
    // this.props.stores.user.getChatroomList()
  }

  render() {
    return (
      <div className="root">
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
