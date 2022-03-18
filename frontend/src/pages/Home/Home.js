import { Component, createRef } from "react";
import { Alert } from "react-bootstrap";
import { createMember, addFriend } from "../../xhr/apiRequest";
import HomeActionCard from "./components/actionCard";
import AddMemberModal from "./components/addMemberModal";
import AddFriendsModal from "./components/addFriendsModal";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      alertVariant: "success",
      alertMessage: "",
    };
    this.addMemberModal = createRef();
    this.addFriendsModal = createRef();

    this.addMemberHandler = this.addMember.bind(this);
    this.addFriendsHandler = this.addFriends.bind(this);

    // TODO: Get these actions from API.
    this.actions = [
      {
        key: 1,
        heading: "Add Member",
        callbackFn: () => this.addMemberModal.current.showModalHandler(),
      },
      {
        key: 2,
        heading: "Add Friends",
        callbackFn: () => this.addFriendsModal.current.showModalHandler(),
      },
    ];
  }

  async addMember(memberData) {
    const apiResponse = await createMember(memberData);
    if (apiResponse.success === true) {
      this.setState({
        alert: true,
        alertVariant: "success",
        alertMessage: `${apiResponse.data.name} successfully added.`,
      });
      return true;
    } else {
      this.setState({
        alert: true,
        alertVariant: "danger",
        alertMessage: `Something went wrong!`,
      });
    }
  }
  async addFriends(friend1Id, friend2Id) {
    const apiResponse = await addFriend({
      friend1: friend1Id,
      friend2: friend2Id,
    });
    if (apiResponse.success) {
      this.setState({
        alert: true,
        alertVariant: "success",
        alertMessage: apiResponse.data.message,
      });
      return true;
    } else {
      this.setState({
        alert: true,
        alertVariant: "danger",
        alertMessage: "Something went wrong while adding friendship.",
      });
      return false;
    }
  }

  render(props) {
    return (
      <>
        <Alert variant={this.state.alertVariant} hidden={!this.state.alert}>
          <p>{this.state.alertMessage}</p>
        </Alert>
        <HomeActionCard actions={this.actions} />
        <AddMemberModal
          submitAction={this.addMemberHandler}
          ref={this.addMemberModal}
        />
        <AddFriendsModal
          submitAction={this.addFriendsHandler}
          ref={this.addFriendsModal}
        />
        <br />
      </>
    );
  }
}

export default HomePage;
