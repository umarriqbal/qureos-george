import { Component, createRef } from "react";
import MembersList from "./components/membersList";
import ActionCard from "../Home/components/actionCard";
import { Spinner, Alert } from "react-bootstrap";
import { getAllMembers, createMember } from "../../xhr/apiRequest";
import AddMemberModal from "../Home/components/addMemberModal";

class MembersPage extends Component {
  constructor(props) {
    super(props);
    this.getMembersHandler = this.getMembers.bind(this);
    this.state = {
      dataLoaded: false,
      members: [],
      alert: false,
      alertVariant: "success",
      alertMessage: "",
    };
    this.reloadCallback = this.reload.bind(this);
    this.addMemberModal = createRef();
    this.addMemberHandler = this.addMember.bind(this);

    this.actions = [
      {
        key: 1,
        heading: "Add Member",
        callbackFn: () => this.addMemberModal.current.showModalHandler(),
      },
    ];
  }
  async getMembers() {
    const apiResponse = await getAllMembers();
    if (apiResponse.success === true) {
      this.setState({ members: apiResponse.data, dataLoaded: true });
    } else {
      this.setState({
        dataLoaded: true,
        alert: true,
        alertVariant: "danger",
        alertMessage: "Something went wrong.",
      });
    }
  }
  async componentDidMount() {
    await this.getMembersHandler();
  }
  async addMember(memberData) {
    const apiResponse = await createMember(memberData);
    if (apiResponse.success === true) {
      this.setState({
        alert: true,
        alertVariant: "success",
        alertMessage: `${apiResponse.data.name} successfully added.`,
      });
      await this.reload();
      return true;
    } else {
      this.setState({
        alert: true,
        alertVariant: "danger",
        alertMessage: `Something went wrong!`,
      });
      return false;
    }
  }
  async reload() {
    await this.getMembersHandler();
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
    } else if (this.state.members.length === 0) {
      <Alert variant="warning">
        <p>No members added yet.</p>
      </Alert>;
      <ActionCard actions={this.actions} />;
    } else {
      return (
        <>
          <br />
          <Alert variant={this.state.alertVariant} hidden={!this.state.alert}>
            <p>{this.state.alertMessage}</p>
          </Alert>
          <ActionCard actions={this.actions} />
          <br />
          <AddMemberModal
            submitAction={this.addMemberHandler}
            ref={this.addMemberModal}
          />
          <MembersList memberItems={this.state.members} />
        </>
      );
    }
  }
}

export default MembersPage;
