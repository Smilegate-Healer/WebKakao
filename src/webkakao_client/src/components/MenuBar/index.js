import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import Btn from './Btn'
import './MenuBar.scss';
class MenuBar extends Component {

    render() {
        return (
            <div className={`${this.props.className} menuContainer border`}>
                <Btn className="menuBarLogo" btnName='friendList'></Btn>
                <Btn className="menuBarLogo" btnName='chatroomList'></Btn>
                <Btn className="menuBarLogo" btnName='option'></Btn>
                {/* Btn<NewChatBtn className="price">{item.price}원</NewChatBtn>
                <SettingBtn className="price">{item.price}원</SettingBtn>
                <div className="count">{item.count}</div>
                <div className="return" onClick={() => onTake(item.name)}>갖다놓기 </div> */}
            </div>
        );
    }

}

export default MenuBar;