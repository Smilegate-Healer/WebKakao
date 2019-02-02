import React from 'react'
import PropTypes, { string, number } from 'prop-types'
import './styles.scss'
import { Person, } from '@material-ui/icons'
import { Typography } from '@material-ui/core'


class ListItem extends React.Component {

  static defaultProps = {
    item: {
      chatroomName: "기본이름",
      logo: '',
      lastMsg: "마지막 메시지 입니다.",
      date: "2019/01/01"
    }
  }

  render() {
    const { item } = this.props
    return (
      <li className="ListItem" onClick={this.props.onClick}>
        <div className="logoContainer" onClick={this.props.onLogoClick}>
          {
            item.logo ? item.logo : <Person fontSize="large"/>
          }
        </div>

        <div className="nameMsgContainer">
          <div className="name">
            <Typography 
              variant="body1" 
              color="textPrimary">
              {item.chatroomName}
            </Typography>
          </div>
          <div className="msg">
            <Typography variant="body2" color="textSecondary">
              {item.lastMsg}
            </Typography>
          </div>
        </div>

        <div className="dateContainer">
          <Typography variant="body2" className="date">
            {item.date}
          </Typography>
        </div>
      </li>
    )
  }
}

ListItem.propTypes = {
  item: PropTypes.objectOf({
    chatroomName: string,
    logo: string,
    lastMsg: string,
    date: string
  })
}



export default ListItem