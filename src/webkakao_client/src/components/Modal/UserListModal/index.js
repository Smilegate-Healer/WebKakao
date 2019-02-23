import React from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import styles from "./styles.module.scss";
import {
  InputBase,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import InviteBtn from "./InviteBtn";
import FriendList from "./FriendList";
import * as hangul from "hangul-js";

@inject("stores")
@observer
class UserListModal extends React.Component {
  state = {
    timer: null
  };

  componentDidMount() {
    Modal.setAppElement("body");
  }

  openModal() {
    const { view } = this.props.stores;
    view.showUserListModal();
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // alert("after open modal");
  };

  closeModal = () => {
    const { view, user } = this.props.stores;
    view.hideUserListModal();
    user.removeSearchUser();
    view.resetSearchTargerStr();
  };

  _onEnter = e => {
    const { searchTargerStr } = this.props.stores.view;
    if (e.key === "Enter") {
      if (searchTargerStr === "") return;
      this._onSearch();
    }
  };

  _onInputChange = e => {
    const { view } = this.props.stores;
    view.setSearchTargerStr(e.target.value);

    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }
    this.setState({
      timer: setTimeout(
        function() {
          this._onSearch();
        }.bind(this),
        200
      )
    });
  };

  _onInviteBtnClick = e => {
    const { view, chatroom } = this.props.stores;
    const type = view.userListType;
    switch (type) {
      case "invite":
        chatroom.inviteChatroom();
        this.closeModal();
        break;
      case "new":
        // alert("new")
        chatroom.newChatroomWithUserList();
        this.closeModal();
        break;
      default:
        break;
    }
  };

  _onSearch = () => {
    const { view } = this.props.stores;
    const searchTargerStr = view.searchTargerStr;

    if (searchTargerStr === "") {
      view.showAllSelectedUser();
      return;
    }
    const friendList = this.props.stores.view.searchUserList;
    for (var i = 0; i < friendList.length; i++) {
      if (hangul.search(friendList[i].name, searchTargerStr) < 0) {
        friendList[i].hide = true;
      } else {
        friendList[i].hide = false;
      }
    }
  };

  render() {
    const { view } = this.props.stores;

    return (
      <Dialog
        open={view.userListModal}
        onClose={this.closeModal}
      >
        <DialogTitle>대화 상대 초대</DialogTitle>
        <DialogContent
          className={styles.dialog}
        >
          <div className={styles.searchContainer}>
            <InputBase
              className={styles.input}
              margin="none"
              onChange={this._onInputChange}
              onKeyPress={this._onEnter}
              value={this.props.stores.view.searchTargerStr}
              autoFocus={true}
              style={{
                backgroundColor: "#f4f4f9"
              }}
              fullWidth
              placeholder="이름 검색"
              endAdornment={<InviteBtn onClick={this._onInviteBtnClick} />}
            />
          </div>
          <div className={styles.listContainer}>
            <FriendList />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default UserListModal;
