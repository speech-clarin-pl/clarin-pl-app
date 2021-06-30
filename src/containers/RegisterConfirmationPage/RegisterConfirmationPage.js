import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

class RegisterConfirmationPage extends Component {

  state = {
    message: "Czekaj..."
  }

  componentDidMount() {
    if (this.props.match.path === "/confirmRegistration/:confirmationCode") {
        const code = this.props.match.params.confirmationCode;
        axios.get("auth/confirmUser/"+code).then(response => {
            
            this.setState({
                message: "Konto potwierdzone!",
            })
        })
    }
  }
  

  
  render() {


    return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{this.state.message}</strong>
            </h3>
          </header>
          {
              this.state.message === "Konto potwierdzone!"?
              <Link to={"/"}>
                Kliknij tutaj aby się zalogować
            </Link> : null
          }
          
        </div>
      );
  }
}


export default RegisterConfirmationPage;

