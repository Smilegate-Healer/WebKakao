import React from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';
import FriendItem from '../../FriendList/FriendItem'
import { InputBase, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import SearchBtn from './SearchBtn';
import CloseBtn from './CloseBtn';
import InvalidUser from './InvalidUser';

@inject('stores')
@observer
class UserSearchModal extends React.Component {

  openModal() {
    const { view } = this.props.stores
    view.showUserSearchModal();
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
        <Dialog
          open={isOpen}
          onClose={this.closeModal}
        >
        <DialogTitle>
          이메일로 친구 추가 
        </DialogTitle>
        <DialogContent>
          <InputBase
            className="input"
            margin="dense"
            onChange={this._onInputChange}
            onKeyPress={this._onEnter}
            value={this.props.stores.view.targetEmail}
            autoFocus={true}
            style={{
              backgroundColor: "#f4f4f9",
              width: 300
            }}
            startAdornment={<CloseBtn onClick={this.closeModal}/>}
            endAdornment={<SearchBtn onClick={this._onClickSearchBtn} />}
            placeholder="상대방 E-Mail"
          />
          {user}
        </DialogContent>
      </Dialog>
    );
  }
}

export default UserSearchModal