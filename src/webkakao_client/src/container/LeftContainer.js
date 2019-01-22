import React from 'react';
import { Component } from 'react';
import TitleBar from '../components/TitleBar/index';
import './Container.scss';
import MenuBar from '../components/MenuBar/index';
import ChatroomList from '../components/ChatroomList'

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
            <div style={{height: "100%", width: "100%"}}>
                <MenuBar className="menuBar"></MenuBar>
                <TitleBar className="titleBar"></TitleBar>
                <ChatroomList className="ChatroomList"></ChatroomList>
            </div>
        );
    }

}

export default LeftContainer;