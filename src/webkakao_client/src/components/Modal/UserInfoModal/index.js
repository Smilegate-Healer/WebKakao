import React from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';
import {
  Close,
  Block,
  PersonAdd,
  ChatBubble
} from '@material-ui/icons'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

@inject('stores')
@observer
class UserInfoModal extends React.Component {

    openModal = () => {
      const { view } = this.props.stores
      view.showUserInfoModal();
    }
  
    afterOpenModal = () => {
      // references are now sync'd and can be accessed.
      // alert("after open modal");
    }
  
    closeModal = () => {
      const { view, user } = this.props.stores
      view.hideUserInfoModal();
      user.removeUserInfo();
    }

    onChatButtonClick = () => {
      const { view, user, chatroom } = this.props.stores
      view.hideUserSearchModal();
      view.hideUserInfoModal();
      chatroom.openChatroom(user.userDetail.user_idx);
      user.removeUserInfo();
    }

    onAddFriendButtonClick = () => {
      const { user } = this.props.stores
      const req = {
        from_user_idx: user.userInfo.user_idx,
        to_user_idx: user.userDetail.user_idx
      }
      user.requestFriend(req);
    }

    _RanderFunc() {
      const { user } = this.props.stores
      const isFriend = user.isFriend();
      if (isFriend) {
        return (<div><ChatBubble onClick={this.onChatButtonClick}/></div>);
      } else {
        return (<div><PersonAdd onClick={this.onAddFriendButtonClick}/><Block/></div>);
      }
    }
  
    render() {
      const isOpen = this.props.stores.view.userInfoModal; 
      const component = this._RanderFunc();
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
              <Close onClick={this.closeModal}
                className="icon"
              />
              Background Image
            </div>
            <div>Profile Image</div>
            <div>
              {component}
            </div>
          </Modal>
        </div>
      );
    }
  }
  
  export default UserInfoModal