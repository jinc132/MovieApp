import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined,
    };
  }

  //update state for specific field
  handleChange(event) {
    let field = event.target.name; //which input
    let value = event.target.value; //what value

    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle signUp button
  handleSignUp(event) {
    event.preventDefault(); //don't submit
    this.props.signUpCall(this.state.email, this.state.password, this.state.handle);
    this.props.history.push('/');
  }

  //handle signIn button
  handleSignIn(event) {
    event.preventDefault(); //don't submit
    this.props.signInCall(this.state.email, this.state.password);
    this.props.history.push('/');
  }

  render() {
    return (
      <form>
        <h1>We are <span>Fun Movies</span></h1>
        <p>Welcome! Log in to your account or register today to leave a review:</p>
        {/* email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control"
            id="email"
            type="email"
            name="email"
            onChange={(e) => this.handleChange(e)}
          />
        </div>

        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control"
            id="password"
            type="password"
            name="password"
            onChange={(e) => this.handleChange(e)}
          />
        </div>

        {/* handle */}
        <div className="form-group">
          <label htmlFor="handle">Nick Name (no input need for Sign-in)</label>
          <input className="form-control"
            id="handle"
            name="handle"
            onChange={(e) => this.handleChange(e)}
          />
        </div>


        {/* buttons */}
        <div className="form-group">
          <button className="btn btn-primary mr-2"
            onClick={(e) => this.handleSignUp(e)}
          >
            Sign-up
            </button>
          <button className="btn btn-primary"
            onClick={(e) => this.handleSignIn(e)}
          >
            Sign-in
            </button>
        </div>
      </form>
    )
  }
}

export default SignUp
