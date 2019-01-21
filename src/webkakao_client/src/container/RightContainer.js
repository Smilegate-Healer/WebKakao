import React from 'react';
import { Component } from 'react';
import TitleBar from '../components/TitleBar/index';
import './Container.css';
import MenuBar from '../components/MenuBar/index';

class RightContainer extends Component {

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
            <div className="RightContainer inline">
                right
            </div>
        );
    }

}

export default RightContainer;