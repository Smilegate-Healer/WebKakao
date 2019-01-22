import React from 'react';
import { Component } from 'react';
import './MenuBar.scss';
import friendListLogo from '../../resources/LeftContainer/MenuBar/person.png';
import chatroomListLogo from '../../resources/LeftContainer/MenuBar/talk.png';
import optionLogo from '../../resources/LeftContainer/MenuBar/option.png';

class Btn extends Component {

    _renderLogo = () => {
        let logo;
        switch (this.props.btnName) {
            case 'friendList':
                logo = friendListLogo;
                break;
            case 'chatroomList':
                logo = chatroomListLogo;
                break;
            case 'option':
                logo = optionLogo;
                break;
            default:
                logo = null;
        }
        return logo;
    }

    onClickButton = () => {
        switch (this.props.btnName) {
            case 'friendList':
                alert('friendList');
                break;
            case 'chatroomList':
            alert('chatroomList');
                break;
            case 'option':
            alert('option');
                break;
            default:
            alert('default');
        }
      }

    render() {
        const logo = this._renderLogo();
        return (
            <div className="inline menu_bar_btn" onClick={this.onClickButton}>
                <img className="menu_bar_logo" src={logo} />
            </div>
        );
    }

}

export default Btn;