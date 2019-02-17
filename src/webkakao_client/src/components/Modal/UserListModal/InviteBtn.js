
import React from 'react'
import { 
  Button,
  IconButton,
  ButtonBase,
} from '@material-ui/core'
import {
  SearchOutlined,
  GroupAdd
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
class SearchBtn extends React.Component {

  _randerFunc = () => {
    const { view } = this.props.stores;
    const selectedCount = view.checkedUser;

    if(selectedCount)
      return (<IconButton
        aria-label="Send the message"
        onClick={this.props.onClick}
        className="SendBtn"
        style={{
          backgroundColor: "#F9DC09"
        }}>
        <GroupAdd 
          className="icon"
          fontSize="small"
          />
      </IconButton>);
    else {
      return;
    }
  }

  render() {
    const component = this._randerFunc();
    return (
      <div>
        {component}
      </div>
    )
  }
}

SearchBtn.propTypes = {
  onClick: PropTypes.func
}

export default SearchBtn