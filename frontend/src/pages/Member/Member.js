import { useParams, useNavigate } from "react-router-dom";

import { Component, createRef } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { getMember, addFriend } from "../../xhr/apiRequest";
import AddFriendModal from "./components/addFriendModal";
import InfoCard from "./components/infoCard";
import PeopleSection from "./components/peopleSection";

class Member extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigate;
    this.memberId = this.props.memberId;

    this.addFriendModal = createRef();
    this.addFriendHandler = this.addFriend.bind(this);

    this.state = {
      dataLoaded: false,
      memberInfo: {},
      addFriendModalHandler: () => {},
      alert: false,
      alertVariant: "",
      alertMessage: "",
    };
  }
  async componentDidMount() {
    await this.getMember();
    this.setState({
      addFriendModalHandler: this.addFriendModal.current.showModalHandler,
    });
  }

  async getMember() {
    const apiResponse = await getMember(this.memberId);
    if (apiResponse.success === true) {
      this.setState({ memberInfo: apiResponse.data, dataLoaded: true });
    } else {
      this.setState({
        dataLoaded: true,
        alert: true,
        alertVariant: "danger",
        alertMessage: "Something went wrong.",
      });
    }
  }

  async addFriend(friendId) {
    const myId = `${this.state.memberInfo._id}`;
    var myOldFriends = [];
    this.state.memberInfo.friends.forEach((friend) => {
      myOldFriends.push(friend.id);
    });
    if (myId === friendId) {
      this.setState({
        modal: false,
        alert: true,
        alertVariant: "warning",
        alertMessage: "You can't add a member as their own friend.",
      });
    } else if (myOldFriends.includes(friendId)) {
      this.setState({
        modal: false,
        alert: true,
        alertVariant: "warning",
        alertMessage: "You can't add a member that's already their friend!",
      });
    } else {
      const apiResponse = await addFriend({
        friend1: myId,
        friend2: friendId,
      });
      if (apiResponse.success) {
        this.setState({
          modal: false,
          alert: true,
          alertVariant: "success",
          alertMessage: apiResponse.data.message,
        });
        await this.reload();
      } else {
        this.setState({
          modal: false,
          alert: true,
          alertVariant: "danger",
          alertMessage: "Something went wrong while adding friendship.",
        });
      }
    }
  }
  async reload() {
    await this.getMember();
  }

  render(props) {
    if (!this.state.dataLoaded) {
      return (
        <>
          <br />
          <Spinner
            as="span"
            animation="border"
            size="xxl"
            role="status"
            aria-hidden="true"
            style={{
              position: "fixed",
              overflow: "show",
              margin: "auto",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        </>
      );
    } else {
      return (
        <>
          <br />
          <Alert variant={this.state.alertVariant} hidden={!this.state.alert}>
            <p>{this.state.alertMessage}</p>
          </Alert>
          <br />
          <InfoCard
            memberName={this.state.memberInfo.name}
            memberWebsiteShort={this.state.memberInfo.websiteShort}
            memberWebsite={this.state.memberInfo.website}
            memberWebsiteHeadings={this.state.memberInfo.websiteHeadings}
            memberFriends={this.state.memberInfo.friends}
            addFriendFn={this.state.addFriendModalHandler}
          ></InfoCard>
          <AddFriendModal
            submitAction={this.addFriendHandler}
            ref={this.addFriendModal}
          />
          <br />
          <PeopleSection memberId={this.state.memberInfo.id} />
        </>
      );
    }
  }
}

function WithParamsAndNavigate(props) {
  let navigate = useNavigate();
  let { memberId } = useParams();
  return <Member {...props} navigate={navigate} memberId={memberId} />;
}

export default WithParamsAndNavigate;
