
import React, {Component} from 'react';
import { withRouter, Redirect } from "react-router-dom";

import { logout } from "../../services/auth";

class SignOut extends Component {



handleSignOut () {
  logout();
};

render() {
    this.handleSignOut();
    return (
      <div>
        <Redirect to={{ pathname: "/" }} />
      </div>
    );
  }
}

export default withRouter(SignOut);