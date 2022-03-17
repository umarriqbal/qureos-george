import { Modal, Spinner, Button, Form } from "react-bootstrap";
import { Component } from "react";

class AddMemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      formValidated: false,
      addBtn: true,
      spinner: false,
    };
    this.addMemberFn = props.submitAction;
    this.formSubmitHandler = this.validateAndSend.bind(this);
    this.showModalHandler = this.showModal.bind(this);
    this.hideModalHandler = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ modal: true });
  }
  hideModal() {
    this.setState({ modal: false });
  }

  async validateAndSend(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const isFormValid = form.checkValidity() === true;
    if (!isFormValid) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ addFormValidated: true });
    if (isFormValid) {
      this.setState({
        addBtn: false,
        spinner: true,
      });
      await this.addMemberFn({
        name: e.target.memberName.value,
        website: e.target.memberWebsite.value,
      });
      this.setState({
        modal: false,
        formValidated: false,
        addBtn: false,
        spinner: false,
      });
    }
  }

  render() {
    return (
      <Modal
        show={this.state.modal}
        onHide={this.hideModalHandler}
        animation={true}
      >
        <Form
          noValidate
          validated={this.state.formValidated}
          onSubmit={this.formSubmitHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="memberName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="memberWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control required type="text" placeholder="Enter website" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModalHandler}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
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
              Add Member
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddMemberModal;
