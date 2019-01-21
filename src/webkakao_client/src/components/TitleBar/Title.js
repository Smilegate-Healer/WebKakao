import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import './TitleBar.css';
class Title extends Component {

    state = {
        menu_type: 'ChatroomList',
        keyword: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.keyword]: e.target.value
        });
      }

    render() {
        return (
            <div className="inline title_bar_title">
                <input className="title_bar_input"
                    placeholder={this.props.title}
                    value={this.state.name}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

}

export default Title;