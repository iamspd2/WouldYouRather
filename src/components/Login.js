import React, { Component } from "react";
import { Card, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Navigation from "./Navigation";

class Login extends Component {
  state = {
    selectedUser: "Select User"
  };

  render() {
    return (
      <div>
        <Navigation />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            marginTop: "50px"
          }}
        >
          <Card>
            <Card.Header>
              <Card.Title>Welcome to the Would You Rather App!</Card.Title>
              <Card.Subtitle>Please log in to continue</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <DropdownButton
                id="dropdown-basic-button"
                title={
                  this.state.selectedUser === "Select User"
                    ? "Select User"
                    : this.props.users[this.state.selectedUser].name
                }
                onSelect={this.handleUserSelect}
                onClick={event => {
                  event.preventDefault();
                }}
              >
                {Object.keys(this.props.users).map(user => (
                  <Dropdown.Item key={user} href={user}>
                    {this.props.users[user].name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Card.Body>
            <Card.Footer>
              <LinkContainer
                to={
                  this.props.location.state
                    ? this.props.location.state.referrer
                    : "/"
                }
              >
                <Button
                  variant="primary"
                  onClick={event => this.handleLogin(event)}
                >
                  Login
                </Button>
              </LinkContainer>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }

  handleLogin() {
    this.props.dispatch(setAuthedUser(this.state.selectedUser));
  };

  handleUserSelect = e => {
    this.setState({
      selectedUser: e
    });
  };
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(mapStateToProps)(Login);
