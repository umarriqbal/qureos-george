import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MembersList(props) {
  const navigate = useNavigate();
  const viewMember = (e) => {
    navigate(`/member/${e.target.value}`);
  };
  if (props.memberItems.length > 0) {
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.memberItems.map((memberItem) => (
            <tr key={memberItem._id}>
              <td>{memberItem.name}</td>
              <td>
                <a href={memberItem.websiteShort}>{memberItem.websiteShort}</a>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  value={memberItem._id}
                  onClick={viewMember}
                >
                  View Member
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else {
    return <></>;
  }
}

export default MembersList;
