import React from 'react';
import InputCounter from './InputCounter.js';
import AuthInterface from '../interfaces/AuthInterface';
import '../../css/LoginRegister.css';



class LoginRegister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      setLoggedIn: props.setLoggedIn,
      user: props.user,
      type: props.type == "login" ? "login" : "register"
    }
  }

  componentDidMount() {
    let elem_id = this.state.type + '-modal';
    let login_form = document.getElementById(elem_id);
    login_form.addEventListener('submit', this.submitLogin.bind(this));
  }


  submitLogin(e) {
    e.preventDefault();
    let form = e.srcElement;
    let email = form.email.value;
    let password = form.password.value;
    AuthInterface.login(email, password).then((response) => this.manageLogin(response));
  }

  submitRegistration(e) {
    e.preventDefault();
    let form = e.srcElement;
    let email = form.email.value;
    let username = form.username.value;
    let password = form.password.value;
    let password_confirmation = form['password-confirm'].value;
    AuthInterface.register(username, email, password, password_confirmation).then((response) => this.manageLogin(response));
  }

  manageLogin(response) {
    if(response['user_id']) {
      this.state.setLoggedIn(response['user_name'], response['user_id']);
    }
    $('#login-modal').modal('hide');
    $('#register-modal').modal('hide');
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
      <input type="text" className="form-control mks-input" name="email" />
      <label className="mks-input-label" htmlFor="email">Password</label>
      <input type="password" className="form-control mks-input" name="password" />

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
      <input type="email" className="form-control mks-input" name="email" />

      <label className="mks-input-label" htmlFor="email">Username</label>
      <input type="text" className="form-control mks-input" name="username" />

      <div className="flex flex_row flex_space-between lr-password-container">
        <label className="mks-input-label" htmlFor="email">Password</label>
        <InputCounter elem_id="lr-password" min={8} />
      </div>
      <input id="lr-password" type="password" className="form-control mks-input" name="password" />

      <div className="flex flex_row flex_space-between lr-password-container">
        <label className="mks-input-label" htmlFor="email">Confirm Password</label>
        <InputCounter elem_id="lr-password-confirm" min={8} />
      </div>
      <input id="lr-password-confirm" type="password" className="form-control mks-input" name="password-confirm" />

      <input type="submit" className="mks-tile mks-tile-primary" value="Register" />
    </form>
  )
}