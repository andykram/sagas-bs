import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signUp } from 'actions/auth';

export class SignUp extends React.Component {
  onSignupSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.email.value, this.password.value);
  }

  render() {
    return (
      <form onSubmit={this.onSignupSubmit}>
        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            ref={(i) => { this.email = i; }}
            type="email"
            className="form-control"
            id="signup-email"
            placeholder="silwar@neflaria.net"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            ref={(i) => { this.password = i; }}
            type="password"
            className="form-control"
            id="signup-password"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export const mapStateToProps = (state, props) => props;

export default connect(mapStateToProps, {
  signUp,
})(SignUp);
