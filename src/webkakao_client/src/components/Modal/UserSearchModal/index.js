import React from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';
import FriendItem from './FriendItem'
import { InputBase } from '@material-ui/core'
import SearchBtn from './SearchBtn';
import InvalidUser from './InvalidUser';
import {
  Close
} from '@material-ui/icons'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

@inject('stores')
@observer
class UserSearchModal extends React.Component {

  state = {
    email: '',
  }

  constructor() {
    super();
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  openModal() {
    const { view } = this.props.stores
    view.showUserSearchModal();
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // alert("after open modal");
  }

  closeModal = () => {
    const { view, user } = this.props.stores
    view.hideUserSearchModal();
    user.removeSearchUser();
  }

  _userRanderFunc() {
    const { user } = this.props.stores
    const user_info = user.searchUser;
    if(user_info === 'Invalid User') {
      return (<div><InvalidUser/></div>);
    } else if (user_info) {
      return (<FriendItem user={user_info} />);
    }
  }

  _onEnter = (e) => {
    if(e.key === 'Enter') {
      if(this.state.email === '') return 
      this._onClickSearchBtn();
    }
  }  

  _onInputChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  _onClickSearchBtn = (e) => {
    const { user } = this.props.stores
    const req = {
      user_email: this.state.email
    }
    user.searchFriend(req);
  }

  render() {
    const isOpen = this.props.stores.view.userSearchModal;
    const user = this._userRanderFunc();
    return (
      <div>
        <Modal
          isOpen={isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Close onClick={this.closeModal}
          className="icon"
          />

          <InputBase
            className="input"
            margin="dense"
            onChange={this._onInputChange}
            onKeyPress={this._onEnter}
            value={this.state.email}
            endAdornment={<SearchBtn onClick={this._onClickSearchBtn} />}
          />
          {user}
        </Modal>
      </div>
    );
  }
}

export default UserSearchModal