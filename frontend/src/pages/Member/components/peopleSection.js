import { Breadcrumb } from "react-bootstrap";
import { Component } from "react";
import QureosSearchBar from "../../../components/searchBar";
import { getMembersFromToken } from "../../../xhr/apiRequest";

class PeopleSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: [],
    };
    this.myId = props.memberId;
    this.dataLoadHandler = this.loadInterestingPeople.bind(this);
  }

  async loadInterestingPeople(query) {
    const apiResponse = await getMembersFromToken({
      myId: this.myId,
      token: query[0],
    });
    if (apiResponse.success) {
      this.setState({
        dataLoaded: true,
        data: apiResponse.data.paths,
      });
    }
  }

  render() {
    return (
      <>
        <QureosSearchBar
          isToken={true}
          keyFormat="headingToken"
          searchBarId="tokensSearchBar"
          getSearchItemCallBack={this.dataLoadHandler}
        />
        <br />
        <div hidden={!this.state.dataLoaded || this.state.data.length === 0}>
          <h5>People You May Like</h5>
          {this.state.data.map((pathChain, idx) => (
            <Breadcrumb key={idx}>
              {pathChain.map((pathItem) => {
                return (
                  <Breadcrumb.Item
                    key={pathItem.id}
                    href={
                      pathItem.type === "member"
                        ? `/member/${pathItem.id}`
                        : null
                    }
                  >
                    {pathItem.name}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          ))}
          <br />
        </div>
      </>
    );
  }
}

export default PeopleSection;
