import { Card, Button } from "react-bootstrap";
import { Component } from "react";

class HomeActionCard extends Component {
  constructor(props) {
    super(props);
    this.actions = props.actions;
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <div className="d-grid gap-3">
            {this.actions.map((action) => (
              <Button
                key={action.key}
                variant="outline-primary"
                size="lg"
                onClick={action.callbackFn}
              >
                {action.heading}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default HomeActionCard;
