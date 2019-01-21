import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import './TitleBar.css';
import talkLogo from '../../resources/LeftContainer/TitleBar/talk.png';
import settingLogo from '../../resources/LeftContainer/TitleBar/setting.png';
import searchLogo from '../../resources/LeftContainer/TitleBar/search.png';

class Btn extends Component {

    _renderLogo = () => {
        let logo;
        switch (this.props.btnName) {
            case 'search':
                logo = searchLogo;
                break;
            case 'new_talk':
                logo = talkLogo;
                break;
            case 'setting':
                logo = settingLogo;
                break;
            default:
                logo = null;
        }
        return logo;
    }

    onClickButton = () => {
        switch (this.props.btnName) {
            case 'search':
                alert('search');
                break;
            case 'new_talk':
            alert('new_talk');
                break;
            case 'setting':
            alert('setting');
                break;
            default:
            alert('default');
        }
      }

    render() {
        const logo = this._renderLogo();
        return (
            <div className="inline btn" onClick={this.onClickButton}>
                <img className="logo" src={logo} />
            </div>
        );
    }

}

export default Btn;