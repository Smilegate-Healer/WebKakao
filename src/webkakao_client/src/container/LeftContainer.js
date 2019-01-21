import React from 'react';
import { Component } from 'react';
import TitleBar from '../components/TitleBar/index';
import './Container.css';
import MenuBar from '../components/MenuBar/index';

class LeftContainer extends Component {

    state = {
        menu_type: 'ChatroomList'
    }

    _renderTitle = () => {
        if(this.state.men === 'ChatroomList')
        return (
            <span></span> 
        );
    }


    render() {
        return (
            <div className="LeftContainer inline">
                <TitleBar className="titleBar"></TitleBar>
                <div className="temp">temp</div>
                <MenuBar className="menuBar"></MenuBar>
            </div>
        );
    }

}

export default LeftContainer;