import React from "react";
import { Component } from "react";
import { IconButton } from '@material-ui/core'
import { 
  SearchOutlined,
  AddOutlined,
  SettingsOutlined
} from '@material-ui/icons'

class Btn extends Component {
  _renderLogo = () => {
    let logo;
    switch (this.props.btnName) {
      case "search":
        logo = <SearchOutlined/>;
        break;
      case "new_talk":
        logo = <AddOutlined/>;
        break;
      case "setting":
        logo = <SettingsOutlined/>;
        break;
      default:
        logo = null;
    }
    return logo;
  };

  onClickButton = () => {
    switch (this.props.btnName) {
      case "search":
        alert("search");
        break;
      case "new_talk":
        alert("new_talk");
        break;
      case "setting":
        alert("setting");
        break;
      default:
        alert("default");
    }
  };

  render() {
    return (
      <IconButton classes={{ colorInherit: "button" }} color="inherit">
        {this._renderLogo()}
      </IconButton>
    )
  }
}

export default Btn;
