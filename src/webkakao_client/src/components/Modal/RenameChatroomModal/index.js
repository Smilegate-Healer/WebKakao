import React from "react";
import Modal from "react-modal";
import { inject, observer } from "mobx-react";
import {
  InputBase,
  DialogContent,
  Dialog,
  DialogTitle
} from "@material-ui/core";
import SearchBtn from "./SearchBtn";
import CloseBtn from "./CloseBtn";

@inject("stores")
@observer
class RenameChatroomModal extends React.Component {
  componentDidMount() {
    Modal.setAppElement("body");
  }

  openModal() {
    const { view } = this.props.stores;
    view.showRenameChatroomModal();
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // alert("after open modal");
  };

  closeModal = () => {
    const { view } = this.props.stores;
    view.hideRenameChatroomModal();
    view.resetenameChatroomTargerStr();
  };

  _onEnter = e => {
    const { renameChatroomTargetStr } = this.props.stores.view;
    if (e.key === "Enter") {
      if (renameChatroomTargetStr === "") return;
      this._onClickSearchBtn();
    }
  };

  _onInputChange = e => {
    const { view } = this.props.stores;
    view.setRenameChatroomTargerStr(e.target.value);
  };

  _onClickSearchBtn = e => {
    const { view, chatroom } = this.props.stores;
    chatroom.renameChatroom(view.renameChatroomTargetStr);
  };

  render() {
    const isOpen = this.props.stores.view.renameChatroomModal;
    return (
      <Dialog open={isOpen}>
        <DialogTitle>채팅방 이름</DialogTitle>
        <DialogContent>
          <InputBase
            margin="dense"
            onChange={this._onInputChange}
            onKeyPress={this._onEnter}
            value={this.props.stores.view.renameChatroomTargetStr}
            autoFocus={true}
            style={{
              backgroundColor: "#f4f4f9",
              width: 300,
              padding: "4px 8px 4px 8px"
            }}
            startAdornment={<CloseBtn onClick={this.closeModal} />}
            endAdornment={<SearchBtn onClick={this._onClickSearchBtn} />}
            placeholder="변경할 채팅방 이름"
          />
        </DialogContent>
      </Dialog>
    );
  }

}

export default RenameChatroomModal;
