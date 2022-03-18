import { useSearchParams } from "react-router-dom";
import MembersList from "../Members/components/membersList";
import { getFilteredMembers } from "../../xhr/apiRequest";
import { Spinner } from "react-bootstrap";

import { Component } from "react";

class Token extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      members: [],
    };
    this.queryToken = this.props.queryToken;
  }
  async componentDidMount() {
    const apiResponse = await getFilteredMembers({ token: this.queryToken });
    if (apiResponse.success === true) {
      this.setState({ dataLoaded: true, members: apiResponse.data });
    }
  }
  render() {
    var resp = <></>;
    if (!this.state.dataLoaded) {
      resp = (
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
    } else if (this.state.members.length > 0) {
      resp = (
        <>
          <h6>
            Following members have been writing about{" "}
            <strong>{this.queryToken}</strong>
          </h6>
          <hr />
          <MembersList memberItems={this.state.members} />
        </>
      );
    } else {
      resp = (
        <>
          <h5>
            No one has written about <strong>{this.queryToken}</strong>
          </h5>
        </>
      );
    }
    return resp;
  }
}

function WithSearchParams(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  let queryToken = searchParams.get("token");
  return <Token {...props} queryToken={queryToken} />;
}

export default WithSearchParams;
