import React from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';
import { InputBase } from '@material-ui/core'
import InviteBtn from './InviteBtn';
import CloseBtn from './CloseBtn';
import FriendList from './FriendList'
import * as hangul from 'hangul-js';

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
class UserListModal extends React.Component {

  state = {
    timer: null
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  openModal() {
    const { view } = this.props.stores
    view.showUserListModal();
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // alert("after open modal");
  }

  closeModal = () => {
    const { view, user } = this.props.stores
    view.hideUserListModal();
    user.removeSearchUser();
    view.resetSearchTargerStr();
  }

  _onEnter = (e) => {
    const { searchTargerStr } = this.props.stores.view;
    if (e.key === 'Enter') {
      if (searchTargerStr === '') return
      this._onSearch();
    }
  }

  _onInputChange = (e) => {
    const { view } = this.props.stores;
    view.setSearchTargerStr(e.target.value);

    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }
    this.setState({
      timer: setTimeout(function () { this._onSearch() }.bind(this), 200)
    })
  }

  _onInviteBtnClick = (e) => {
    const { view, chatroom } = this.props.stores;
    const type = view.userListType;
    switch (type) {
      case 'invite':
        chatroom.inviteChatroom();
        this.closeModal();
      break;
      case 'new':
        // alert("new")
        chatroom.newChatroomWithUserList();
        this.closeModal();
      break;
      default:
      break;
    }
  }

  _onSearch = () => {

    const { view } = this.props.stores;
    const searchTargerStr = view.searchTargerStr;

    if (searchTargerStr === '') {
      view.showAllSelectedUser();
      return
    }
    const friendList = this.props.stores.view.searchUserList;
    for (var i = 0; i < friendList.length; i++) {
      if (hangul.search(friendList[i].name, searchTargerStr) < 0) {
        friendList[i].hide = true;
      } else {
        friendList[i].hide = false;
      }
    }
  }

  render() {
    const isOpen = this.props.stores.view.userListModal;
    return (
      <div>
        <Modal
          isOpen={isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <InputBase
              value="대화 상대 초대"
              style={{
                color: "#000000",
                fontSize: 22,
                backgroundColor: "#FFFFFFF",
                width: 300,
                textAlign: "center"
              }}
              readOnly
              startAdornment={<CloseBtn onClick={this.closeModal} />}
              endAdornment={<InviteBtn onClick={this._onInviteBtnClick} />}
            />
          </div>
          <div>
            <InputBase
              className="input"
              margin="dense"
              onChange={this._onInputChange}
              onKeyPress={this._onEnter}
              value={this.props.stores.view.searchTargerStr}
              autoFocus={true}
              style={{
                backgroundColor: "#f4f4f9",
                width: 300
              }}
              placeholder="이름 검색"
            />
            <FriendList />
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserListModal