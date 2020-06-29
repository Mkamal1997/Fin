import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button} from "reactstrap";
class Logout extends Component {

  logout() {
    this.props.history.push('/')
    this.props.keycloak.logout();
  }

  render() {
    return (
      <Button className="ml-auto col-6 col-sm-4 col-lg-2" id="bott1" size="sm" variant="info" type="button" onClick={ () => this.logout() }>
        Logout
      </Button>
    );
  }
}

export default withRouter(Logout);
