import { Modal, Spinner, Button } from "react-bootstrap";
import { Component } from "react";
import QureosSearchBar from "../../../components/searchBar";

class AddFriendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      addBtn: false,
      spinner: false,
      friend: "",
    };
    this.addFriendFn = props.submitAction;
    this.showModalHandler = this.showModal.bind(this);
    this.hideModalHandler = this.hideModal.bind(this);
    this.addFriendsHandler = this.validateAndSend.bind(this);
  }
  showModal() {
    this.setState({ modal: true });
  }
  hideModal() {
    this.setState({ modal: false });
  }
  addFriendCallback(query) {
    if (query.length > 0) {
      this.setState({
        friend: query[0],
        addBtn: true,
      });
    }
  }
  addFriendChangedCallback() {
    if (this.state.addBtn === true) {
      this.setState({ addBtn: false });
    }
  }
  async validateAndSend() {
    const friend1Id = `${this.state.friend._id}`;
    await this.addFriendFn(friend1Id);
    this.setState({
      modal: false,
      addBtn: false,
      spinner: false,
      friend: "",
    });
  }

  render() {
    return (
      <Modal
        show={this.state.modal}
        onHide={this.hideModalHandler}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QureosSearchBar
            searchBarId="addFriendSearchBar"
            isToken={false}
            keyFormat="name"
            placeHolder="Member"
            getSearchItemCallBack={this.addFriendCallback.bind(this)}
            changedInputCallBack={this.addFriendChangedCallback.bind(this)}
          ></QureosSearchBar>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideModalHandler}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={this.addFriendsHandler}
            disabled={!this.state.addBtn}
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={!this.state.spinner}
            />
            Add Friends
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddFriendModal;
