import React from 'react'
import { 
  Button,
  IconButton,
  ButtonBase,
} from '@material-ui/core'
import {
  SearchOutlined
} from '@material-ui/icons'
import PropTypes from 'prop-types'
// import './styles.scss'

class SearchBtn extends React.Component {


  render() {
    return (
      <IconButton
        aria-label="Send the message"
        onClick={this.props.onClick}
        className="SendBtn"
        style={{
          // backgroundColor: "#F9DC09"
        }}>
        <SearchOutlined 
          className="icon"
          fontSize="small"
          />
      </IconButton>
    )
  }
}

SearchBtn.propTypes = {
  onClick: PropTypes.func
}

export default SearchBtn