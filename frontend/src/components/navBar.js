import { Component } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";
// import QureosSearchBar from "./searchBar";

class QureosNavBar extends Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigate;
  }

  render() {
    return (
      <>
        <Navbar bg="light">
          <Container fluid>
            <Navbar.Brand href="/">Qureos George</Navbar.Brand>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/members">Members</Nav.Link>
              </Nav>
              {/* <QureosSearchBar
                searchBarId="mainSearchBar"
                isToken={true}
                keyFormat="name"
                getSearchItemCallBack={}
              ></QureosSearchBar> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
      </>
    );
  }
}
function WithNavigate(props) {
  let navigate = useNavigate();
  return <QureosNavBar {...props} navigate={navigate} />;
}

export default WithNavigate;
