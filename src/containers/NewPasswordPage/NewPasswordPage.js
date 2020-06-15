import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import { Link } from "react-router-dom";
import './NewPasswordPage.css';
import axios from "axios";
import PropTypes from "prop-types"

class NewPasswordPage extends Component {

  state = {
    password: "",
    confirmPassword: "",
    submitted: false
  }

  handleChange = key => e => {
    this.setState({ [key]: e.target.value })
  }

  updatePassword = e => {
    e.preventDefault()
    const { userId, token } = this.props
    const { password } = this.state

    axios.post('/auth/enterNewPass/'+userId+'/'+token, {newPassword: password})
        .then(res => {
          console.log("RESPONSE FROM SERVER TO CLIENT:", res)
        })
        .catch(err => {
          console.log("SERVER ERROR TO CLIENT:", err)
        });
    
        this.setState({ submitted: !this.state.submitted })
  }


  
  
  
  render() {
    const { submitted } = this.state
    return (
      <Aux>
        <h3 style={{ paddingBottom: "1.25rem" }}>Update your password</h3>
        {submitted ? (
          <div className="reset-password-form-sent-wrapper">
            <p>Your password has been saved.</p>
            <Link to="/login" className="ghost-btn">
              Sign back in
            </Link>
          </div>
        ) : (
          <div className="reset-password-form-wrapper">
            <form
              onSubmit={this.updatePassword}
              style={{ paddingBottom: "1.5rem" }}
            >
              <input
                onChange={this.handleChange("password")}
                value={this.state.password}
                placeholder="New password"
                type="password"
              />
              <input
                onChange={this.handleChange("confirmPassword")}
                value={this.state.confirmPassword}
                placeholder="Confirm password"
                type="password"
              />
              <button className="btn-primary password-reset-btn">
                Update password
              </button>
            </form>
          </div>
        )}
      </Aux>
    )
  }
}


NewPasswordPage.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}



export default NewPasswordPage;

