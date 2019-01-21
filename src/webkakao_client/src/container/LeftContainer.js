import React from 'react';
import { Component } from 'react';
import TitleBar from '../components/TitleBar/index';
import './Container.css';

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
            <div className="LeftContainer">
                <TitleBar className="titleBar"></TitleBar>
            </div>
        );
    }

}

export default LeftContainer;