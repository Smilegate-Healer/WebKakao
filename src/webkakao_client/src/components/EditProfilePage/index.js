import React from 'react'
import { 
  List, 
  ListItemText, 
  ListItem, 
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  Button,
  Divider} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import "./styles.scss"
import ProfileImage from '../ProfileImage';
import Dropzone from 'react-dropzone';


@inject("stores")
@observer
class EditProfilePage extends React.Component {

  state = {
    dialog: false,
    input: '',
    changingPassword: false
  }

  _onClick = (e, isChagningPassword) => {
    this.setState({
      dialog: true,
      changingPassword: isChagningPassword
    })
  }

  _onLogoutClick = (e) => {
    this.props.stores.user.logout()
  }


  _handleClose = () => {
    this.setState({
      dialog: false,
      isChagningPassword: false,
      input: ''
    })
  }

  _onProfileDrop = (acceptedFiles, rejectedFiles) => {
    if(acceptedFiles.length === 0) {
      alert("이미지만 업로드 가능합니다.")
      return
    }
    this.props.stores.user.uploadNewProfileImage(acceptedFiles[0])
  }

  render() {
    const { user } = this.props.stores
    
    return (
      <div className="EditProfileContainer">

        <div className="profileContainer">
          <Dropzone 
            onDrop={this._onProfileDrop}
            accept="image/*">
          {
            ({getRootProps, isDragActive}) => {
              return (
                <div 
                  {...getRootProps()}
                >
                  <ProfileImage
                    className="profile"
                    image={user.userInfo.profile_img}
                  />
                </div>
              )
            }
          }
          </Dropzone>
        </div>

        <div className="listContainer">
          <List className="list">
            <ListItem button onClick={this._onClick}>
              <ListItemText primary="상태 메세지"/>
              <ListItemText secondary={user.userInfo.status_msg}/>
            </ListItem> 
            <ListItem button onClick={e => this._onClick(e, true)}>
              <ListItemText primary="비밀번호 변경"/>
            </ListItem> 
            <Divider/>
            <ListItem>
              <Button fullWidth onClick={this._onLogoutClick}>
                로그아웃
              </Button>
            </ListItem>
          </List>
        </div>

        <Dialog
          open={this.state.dialog}
          onClose={this._handleClose}
        >
          <DialogTitle>
            {
              this.state.changingPassword
              ? "비밀번호 변경"
              : "상태 메시지 변경"
            }
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="input"
              label={this.state.changingPassword
                ? "비밀번호 변경"
                : "상태 메시지 변경"
              }
              name="input"
              type={this.state.changingPassword ? "Password" : null}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose}>
              취소
            </Button>
            <Button onClick={this._handleClose}>
              적용
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default EditProfilePage