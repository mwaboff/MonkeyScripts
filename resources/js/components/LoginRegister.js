import React from 'react';
import { Alert } from './Alert.js';
import InputCounter from './InputCounter.js';
import AuthInterface from '../interfaces/AuthInterface';
import '../../css/LoginRegister.css';



class LoginRegister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      setLoggedIn: props.setLoggedIn,
      user: props.user,
      type: props.type == "login" ? "login" : "register",
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    let elem_id = this.state.type + '-modal';
    let login_form = document.getElementById(elem_id);

    if (this.state.type == "login") {
      login_form.addEventListener('submit', this.submitLogin.bind(this));
    } else if (this.state.type == "register") {
      login_form.addEventListener('submit', this.submitRegistration.bind(this));
    }
  }


  submitLogin(e) {
    e.preventDefault();

    if (!validateLoginForm()) {
      document.getElementById('login-form').addEventListener('change', validateLoginForm);
      return;
    };

    let form = e.srcElement;
    let email = form.email.value;
    let password = form.password.value;
    gtag('event', 'login', {'method': 'email'});
    AuthInterface.login(email, password).then((response) => this.manageLogin(response));
  }

  submitRegistration(e) {
    e.preventDefault();

    if (!validateRegistrationForm()) {
      document.getElementById('registration-form').addEventListener('change', validateRegistrationForm);
      return;
    };

    let form = e.srcElement;
    let email = form.email.value;
    let username = form.username.value;
    let password = form.password.value;
    let password_confirmation = form['password-confirm'].value;
    gtag('event', 'sign_up', {'method': 'email'});

    this.setState({
      email: email,
      password: password
    })

    AuthInterface.register(username, email, password, password_confirmation).then((response) => this.manageRegistration(response));
  }

  manageLogin(response) {
    if(response['user_id']) {
      this.state.setLoggedIn(response['user_name'], response['user_id']);
      $('#login-modal').modal('hide');
      $('#register-modal').modal('hide');  
    } else {
      this.manageLoginErrors(response);
    }
  }

  manageRegistration(response) {
    if(response['success'] == true) {
      alert("Account has been created. Please follow the instructions in the activation email. Make sure to check your spam folder!");
      $('#register-modal').modal('hide');  
    } else {
      alert(response['message']);
    }
  }

  manageLoginErrors(response) {
    console.log(response['error_code']);
    if (response['error_code'] == 2) {
      alert("Email has not been activated yet. Please check your emails.");
    } else {
      alert("Invalid Credentials");
    }
  }



  render() {
    let form_choice = (this.state.type == "login" ? <LoginPage /> : <RegisterPage />);
    return (
      <ModalContainer type={ this.state.type }>
        <div className="modal-body">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" ><i className="fas fa-window-close" /></button>
          <div className="flex flex-column">
            { form_choice }
          </div>
        </div>
      </ModalContainer>
    )
  }
}

export default LoginRegister;


function ModalContainer(props) {
  return (
    <div id={props.type + "-modal"} className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-dialog-centered modal-xl">
          <div className="modal-body col-md-12">
            { props.children }
          </div>
        </div>
      </div>
    </div>

  )
}


function LoginPage(props) {
  return (
    <div className="lr-login-page">
      <h2 className="lr-welcome">Welcome Back!</h2>
      <LoginForm />
    </div>
  )
}


function LoginForm(props) {
  return(
    <form id="login-form" className="lr-form flex flex-column" action="/api/login" method="POST">
      <label className="mks-input-label" htmlFor="email">Email</label>

      
      <input id="l-email" type="email" className="form-control mks-input" name="email" />

      <div className="flex flex_row flex_space-between ic-container">
        <label className="mks-input-label" htmlFor="password">Password</label>
        <InputCounter elem_id="l-password" min={8} />
      </div>
      <input id="l-password" type="password" className="form-control mks-input" name="password" />

      <input type="submit" className="mks-tile mks-tile-primary" value="Login" />
    </form>
  )
}

function RegisterPage(props) {
  return (
    <div className="lr-login-page">
      <h2 className="lr-welcome">Welcome to the team!</h2>
      <RegisterForm />
    </div>
  )
}

function RegisterForm(props) {
  return(
    <form id="registration-form" className="lr-form flex flex-column" action="/api/register" method="POST">
      <label className="mks-input-label" htmlFor="email">Email</label>
      <input id="r-email" type="email" className="form-control mks-input" name="email" />

      <label className="mks-input-label" htmlFor="username">Username</label>
      <input id="r-username" type="text" className="form-control mks-input" name="username" />

      <div className="flex flex_row flex_space-between ic-container">
        <label className="mks-input-label" htmlFor="password">Password</label>
        <InputCounter elem_id="r-password" min={8} />
      </div>
      <input id="r-password" type="password" className="form-control mks-input" name="password" />

      <div className="flex flex_row flex_space-between ic-container">
        <label className="mks-input-label" htmlFor="password-confirm">Confirm Password</label>
        <InputCounter elem_id="r-password-confirm" min={8} />
      </div>
      <input id="r-password-confirm" type="password" className="form-control mks-input" name="password-confirm" />

      <input type="submit" className="mks-tile mks-tile-primary" value="Register" />
    </form>
  )
}



function validateRegistrationForm() {
  Alert.removeAllBadInput();
  let result = true;
  let email = document.getElementById("r-email");
  let username = document.getElementById("r-username");
  let password = document.getElementById("r-password")
  let password_confirm = document.getElementById("r-password-confirm");

  if (email.value.length < 5 && !email.value.includes("@")) {
    Alert.setBadInput(email, "Please enter a valid email address");
    result = false;
  }
  if (username.value.length <= 0 || username.value.length > 50) {
    Alert.setBadInput(username, "Summary is required and cannot be more than 50 characters long");
    result = false;
  }
  if (password.value.length < 8) {
    Alert.setBadInput(password, "Passwords must be at least 8 characters long");
    result = false;
  }
  if (password_confirm.value !== password.value) {
    Alert.setBadInput(password_confirm, "Passwords do not match");
    result = false;
  }

  return result;

}


function validateLoginForm() {
  Alert.removeAllBadInput();
  let result = true;
  let email = document.getElementById("l-email");
  let password = document.getElementById("l-password");

  if (email.value.length < 5 && !email.value.includes("@")) {
    Alert.setBadInput(email, "Please enter a valid email address");
    result = false;
  }
  if (password.value.length < 8) {
    Alert.setBadInput(password, "Passwords must be at least 8 characters long");
    result = false;
  }

  return result;
}
