import React from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';
import { InputBase } from '@material-ui/core'
import SearchBtn from './SearchBtn';
import CloseBtn from './CloseBtn';

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
class RenameChatroomModal extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  openModal() {
    const { view } = this.props.stores
    view.showRenameChatroomModal();
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // alert("after open modal");
  }

  closeModal = () => {
    const { view } = this.props.stores
    view.hideRenameChatroomModal();
    view.resetRenameChatroomTargerStr();
  }

  _onEnter = (e) => {
    const { renameChatroomTargetStr } = this.props.stores.view;
    if(e.key === 'Enter') {
      if(renameChatroomTargetStr === '') return 
      this._onClickSearchBtn();
    }
  }  

  _onInputChange = (e) => {
    const { view } = this.props.stores;
    view.setRenameChatroomTargerStr(e.target.value);
  }

  _onClickSearchBtn = (e) => {
    const { view, chatroom } = this.props.stores;
    chatroom.renameChatroom(view.renameChatroomTargetStr);
  }

  render() {
    const isOpen = this.props.stores.view.renameChatroomModal;
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
            value="채팅방 이름"
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
            value={this.props.stores.view.renameChatroomTargetStr}
            autoFocus={true}
            style={{
              backgroundColor: "#f4f4f9",
              width: 300
            }}
            startAdornment={<CloseBtn onClick={this.closeModal}/>}
            endAdornment={<SearchBtn onClick={this._onClickSearchBtn} />}
            placeholder="변경할 채팅방 이름"
          />
          </div>
        </Modal>
      </div>
    );
  }
}

export default RenameChatroomModal