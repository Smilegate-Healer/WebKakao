import React from "react";
import { Component } from "react";
import "./TitleBar.scss";
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

class Title extends Component {
  state = {
    menu_type: "ChatroomList",
    keyword: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.keyword]: e.target.value
    });
  };
  
  render() {
    return (
      <Typography
        align="left"
        color="default"
        variant="h5">
        {this.props.title}
      </Typography>
    )
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title;
