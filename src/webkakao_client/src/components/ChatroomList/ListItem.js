import React from 'react'
import PropTypes, { string, number } from 'prop-types'
import './styles.scss'
import { Person, } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import DateForamtter from '../../utils/DateFormatter'


class ListItem extends React.Component {

  static defaultProps = {
    item: {
      chatroomName: "기본이름",
      logo: null,
      last_msg: "마지막 메시지 입니다.",
      timestamp: 1234123412342312
    }
  }

  render() {
    const { item } = this.props

    const date = DateForamtter.getKoreanDate(item.timestamp)
    return (
      <li className="ListItem" onClick={this.props.onClick}>
        <div className="logoContainer" onClick={this.props.onLogoClick}>
          {
            item.logo && item.logo !== 'default' ? item.logo : <Person fontSize="large"/>
          }
        </div>

        <div className="nameMsgContainer">
          <div className="name">
            <Typography 
              variant="body1" 
              color="textPrimary">
              {item.chatroomName} {/* TODO */}
            </Typography>
          </div>
          <div className="msg">
            <Typography variant="body2" color="textSecondary">
              {item.last_msg}
            </Typography>
          </div>
        </div>

        <div className="dateContainer">
          <Typography variant="body2" className="date">
            {date}
          </Typography>
        </div>
      </li>
    )
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    chatroomName: PropTypes.string,
    logo: PropTypes.string,
    lastMsg: PropTypes.string,
    date: PropTypes.string
  })
}



export default ListItem