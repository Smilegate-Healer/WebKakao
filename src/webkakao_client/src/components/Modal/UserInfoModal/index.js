import React from 'react';
import ProfileImage from '../../ProfileImage'
import { inject, observer } from 'mobx-react';
import styles from "./styles.module.scss"
import {
  Block,
  PersonAdd,
  ChatBubble,
} from '@material-ui/icons'
import {
  Dialog,
  Typography,
  IconButton
} from '@material-ui/core'
import classnames from 'classnames'
import AddFriendIcon from "../../../resources/btn_profile_add_friend@2x.png"
import AddFriendPressIcon from "../../../resources/btn_profile_add_friend_press@2x.png"
import NewChatIcon from "../../../resources/btn_profile_chat@2x.png"
import NewChatPressIcon from "../../../resources/btn_profile_chat_press@2x.png"
import BlockIcon from "../../../resources/btn_profile_block_friend@2x.png"
import BlockPressIcon from "../../../resources/btn_profile_block_friend_press@2x.png"

@inject('stores')
@observer
class UserInfoModal extends React.Component {

    openModal = () => {
      const { view } = this.props.stores
      view.showUserInfoModal();
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
      const { user, view } = this.props.stores
      const req = {
        from_user_idx: user.userInfo.user_idx,
        to_user_idx: user.userDetail.user_idx
      }
      user.requestFriend(req);
      view.resetTargerEmail();
      user.removeSearchUser();
    }

    _renderButton = (style, text, onClick) => {
      return (
        <div className={styles.button}>
          <IconButton 
            style={{padding: 0}}
            onClick={onClick}
          >
            <div className={classnames(styles.base, style)}/>
          </IconButton>
          <Typography variant="" className={styles.text}>
            {text}
          </Typography>
        </div>
      )
    }

    _renderButtons() {
      const { user } = this.props.stores
      const isFriend = user.isFriend();
      
      if (isFriend) {
        return [
          this._renderButton(styles.newChat, "1:1 Chat", this.onChatButtonClick),
          this._renderButton(styles.block, "Block")
        ]
      } else {
        return [
          this._renderButton(styles.add, "Add Friend", this.onAddFriendButtonClick),
          this._renderButton(styles.block, "Block")
        ]
      }
    }

    render() {
      const isOpen = this.props.stores.view.userInfoModal; 
      const { userDetail } = this.props.stores.user
      if(!userDetail) return null
      return (
        <Dialog
          open={isOpen}
          onClose={this.closeModal}>
            <div className={styles.container}> 
              <div className={styles.profileNameContainer}>
                <ProfileImage
                  className={styles.profile}
                  image={userDetail.profile_img}
                />
                <Typography variant="h5" className={styles.name}>
                  {userDetail.name}
                </Typography>
              </div>

              <div className={styles.backgroundContainer}>
                <div className={styles.statusContainer}>
                  <Typography variant="h5">
                    {userDetail.status_msg ? userDetail.status_msg : "-"}
                  </Typography>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                {this._renderButtons()}
              </div>
            </div>
        </Dialog>
      );
    }
  }
  
  export default UserInfoModal