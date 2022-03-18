import { Card, Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function InfoCard(props) {
  const navigate = useNavigate();
  const onFriendClick = (e) => {
    navigate(`/member/${e.target.value}`);
    window.location.reload(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.memberName}</Card.Title>
        <a href={props.memberWebsiteShort}>
          <Card.Text>{props.memberWebsite}</Card.Text>
        </a>
        <a href={props.memberWebsiteShort}>
          <Card.Text>{props.memberWebsiteShort}</Card.Text>
        </a>
        <br />
        <Accordion flush>
          <Accordion.Item eventKey="headings">
            <Accordion.Header>Headings</Accordion.Header>
            <Accordion.Body>
              {props.memberWebsiteHeadings.join(", ")}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="friends">
            <Accordion.Header>Friends</Accordion.Header>
            <Accordion.Body>
              {props.memberFriends.map((friend) => (
                <Button
                  key={friend.id}
                  value={friend.id}
                  variant="outline-primary me-1 mt-1"
                  onClick={onFriendClick}
                >
                  {friend.name}
                </Button>
              ))}
              <hr />
              <Button
                className="float-end"
                onClick={props.addFriendFn}
                variant="primary"
              >
                Add Friend
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
