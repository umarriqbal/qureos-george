import { Modal, Spinner, Button } from "react-bootstrap";
import { Component } from "react";
import QureosSearchBar from "../../../components/searchBar";

class AddFriendsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      addBtn: false,
      spinner: false,
      friend1: "",
      friend2: "",
    };
    this.addFriendsFn = props.submitAction;
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
  addFriend1Callback(query) {
    if (query.length > 0) {
      this.setState({
        friend1: query[0],
      });
      if (this.state.friend2) {
        this.setState({ addFriendBtn: true });
      }
    }
  }
  addFriend2Callback(query) {
    if (query.length > 0) {
      this.setState({
        friend2: query[0],
      });
      if (this.state.friend1) {
        this.setState({ addBtn: true });
      }
    }
  }
  addFriend1ChangedCallback() {
    if (this.state.addBtn === true) {
      this.setState({ addBtn: false });
    }
  }
  addFriend2ChangedCallback() {
    if (this.state.addBtn === true) {
      this.setState({ addBtn: false });
    }
  }
  async validateAndSend(e) {
    const friend1Id = `${this.state.friend1._id}`;
    const friend2Id = `${this.state.friend2._id}`;
    await this.addFriendsFn(friend1Id, friend2Id);
    this.setState({
      modal: false,
      addBtn: false,
      spinner: false,
      friend1: "",
      friend2: "",
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
          <Modal.Title>Add Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QureosSearchBar
            searchBarId="friend1SearchBar"
            isToken={false}
            keyFormat="name"
            placeHolder="Member 1"
            getSearchItemCallBack={this.addFriend1Callback.bind(this)}
            changedInputCallBack={this.addFriend1ChangedCallback.bind(this)}
          ></QureosSearchBar>
          <br />
          <QureosSearchBar
            searchBarId="friend2SearchBar"
            isToken={false}
            keyFormat="name"
            placeHolder="Member 2"
            getSearchItemCallBack={this.addFriend2Callback.bind(this)}
            changedInputCallBack={this.addFriend2ChangedCallback.bind(this)}
          ></QureosSearchBar>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
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

export default AddFriendsModal;
