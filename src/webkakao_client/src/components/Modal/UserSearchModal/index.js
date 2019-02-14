import React from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';
import FriendItem from './FriendItem'
import { InputBase } from '@material-ui/core'
import SearchBtn from './SearchBtn';
import CloseBtn from './CloseBtn';
import InvalidUser from './InvalidUser';

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
    view.resetTargerEmail();
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
    const { targerEmail } = this.props.stores.view;
    if(e.key === 'Enter') {
      if(targerEmail === '') return 
      this._onClickSearchBtn();
    }
  }  

  _onInputChange = (e) => {
    const { view } = this.props.stores;
    view.setTargerEmail(e.target.value);
  }

  _onClickSearchBtn = (e) => {
    const { user, view } = this.props.stores
    const req = {
      user_email: view.targerEmail
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
        <div>
          <InputBase
            value="이메일로 친구 추가"
            style={{
              color: "#000000",
              fontSize: 22,
              backgroundColor: "#FFFFFFF",
              width: 300,
              textAlign: "center"
            }}
            readOnly
          />
        </div>
        <div>
          <InputBase
            className="input"
            margin="dense"
            onChange={this._onInputChange}
            onKeyPress={this._onEnter}
            value={this.props.stores.view.targetEmail}
            autoFocus="true"
            style={{
              backgroundColor: "#f4f4f9",
              width: 300
            }}
            startAdornment={<CloseBtn onClick={this.closeModal}/>}
            endAdornment={<SearchBtn onClick={this._onClickSearchBtn} />}
            placeholder="상대방 E-Mail"
          />
          {user}
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserSearchModal