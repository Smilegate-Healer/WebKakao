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
import { inject } from 'mobx-react'
import "./styles.scss"
import ProfileImage from '../ProfileImage';
import Dropzone from 'react-dropzone';


@inject("stores")
class EditProfilePage extends React.Component {

  state = {
    dialog: false
  }

  _onClick = (e) => {
    this.setState({
      dialog: true
    })
  }

  _onLogoutClick = (e) => {
    alert("logout")
  }


  _handleClose = () => {
    this.setState({
      dialog: false
    })
  }

  _onProfileDrop = (acceptedFiles, rejectedFiles) => {
    this.props.stores.user.uploadNewProfileImage(acceptedFiles[0])
  }

  render() {
    const { user } = this.props.stores
    
    return (
      <div className="EditProfileContainer">

        <div className="profileContainer">
          <Dropzone onDrop={this._onProfileDrop}> 
          {
            ({getRootProps, isDragActive}) => {
              return (
                <div 
                  {...getRootProps()}
                  accept="image/*"
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
              <ListItemText primary="Status message"/>
              <ListItemText secondary={user.userInfo.status_msg}/>
            </ListItem> 
            <Divider/>
            <ListItem>
              <Button fullWidth onClick={this._onLogoutClick}>
                Logout
              </Button>
            </ListItem>
          </List>
        </div>

        <Dialog
          open={this.state.dialog}
          onClose={this._handleClose}
        >
          <DialogTitle>Edit status message</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="statusMessag"
              label="Status Message"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose}>
              Cancel
            </Button>
            <Button onClick={this._handleClose}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default EditProfilePage