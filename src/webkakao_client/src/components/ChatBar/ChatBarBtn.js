import React from 'react'
import { IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIOS from '@material-ui/icons/ArrowBackIos'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import "./styles.scss"

class ChatBarBtn extends React.Component {

  _renderIcon() {
    switch(this.props.type) {
      case "search":
      return <SearchIcon fontSize={this.props.size}/>
      case "arrowback":
      return <ArrowBackIOS fontSize={this.props.size}/>
      case "menu":
      return <MenuIcon fontSize={this.props.size}/>
      default:
    }
    return null
  }

  render() {
    return (
      <IconButton 
        aria-label={this.props.type} 
        className="IconButton"
        onClick={this.props.onClick}>
        {this._renderIcon()}
      </IconButton>
    )
  }
}

ChatBarBtn.propTypes = {
  type: PropTypes.oneOf("serach", "arrowback", "menu"),
  size: PropTypes.oneOf("small", "large"),
  onClick: PropTypes.func,
}


export default ChatBarBtn