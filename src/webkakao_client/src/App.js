import React, { Component } from 'react';
import './styles.scss'
import LeftContainer from './container/LeftContainer';
import RightContainer from './container/RightContainer';


class App extends Component {
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
