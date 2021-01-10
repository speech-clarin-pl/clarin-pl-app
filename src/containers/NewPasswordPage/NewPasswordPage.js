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
    submitted: false,
    czyHaslaPasuja: true,
  }

  handleChange = key => e => {
    this.setState({ [key]: e.target.value })
  }

  updatePassword = e => {
    e.preventDefault()
    const { userId, token } = this.props;
    const { password } = this.state;
    const { confirmPassword } = this.state;

    if((password===confirmPassword) && password.length>6){

      this.setState({
        czyHaslaPasuja: true,
      })

      axios.post('/auth/enterNewPass/'+userId+'/'+token, {newPassword: password})
          .then(res => {
            console.log("RESPONSE FROM SERVER TO CLIENT:", res)
          })
          .catch(err => {
            console.log("SERVER ERROR TO CLIENT:", err)
          });
      
          this.setState({ submitted: !this.state.submitted })
    } else {
      this.setState({
        czyHaslaPasuja: false,
      })
    }
  }

  
  render() {
    const { submitted } = this.state
    return (
      <Aux>
        <p></p>
        <h3 style={{ paddingBottom: "1.25rem" }}>Wpisz swoje nowe hasło</h3>
        <p>Hasło musi składać się z conajmniej 7 znaków</p>
        {this.state.czyHaslaPasuja===false?<b>Hasła nie pasują do siebie</b>:null}
        {submitted ? (
          <div className="reset-password-form-sent-wrapper">
            <p>Twoje hasło zostało zapisane.</p>
            <Link to="/login" className="ghost-btn">
              Wróć aby się zalogować
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
                placeholder="Nowe hasło"
                type="password"
              />
              <input
                onChange={this.handleChange("confirmPassword")}
                value={this.state.confirmPassword}
                placeholder="Potwierdź hasło"
                type="password"
              />
              <button className="btn-primary password-reset-btn">
                Zmień hasło
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

