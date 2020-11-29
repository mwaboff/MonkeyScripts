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
    // let login_form = document.getElementById('login-form');
    // login_form.addEventListener('submit', this.submitLogin.bind(this));

    // let register_form = document.getElementById('registration-form');
    // register_form.addEventListener('submit', this.submitRegistration.bind(this));
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
    AuthInterface.register(username, email, password, password_confirmation);
  }

  manageLogin(response) {
    if(response['user_id']) {
      this.state.setLoggedIn(response['user_name'], response['user_id']);
    }
  }

  render() {
    let form_choice = (this.state.type == "login" ? <LoginPage /> : <RegisterPage />);
    return (
      <ModalContainer type={ this.state.type }>
          <button type="button" className="close lr-close-btn" data-dismiss="modal" aria-label="Close"><i className="fas fa-window-close" /></button>
          <div className="flex flex_column flex_center-full lr-form">
           { form_choice }

          </div>
      </ModalContainer>
    )
  }
}

export default LoginRegister;


function ModalContainer(props) {
  return (
    <div id={props.type + "-modal"} className="modal modal-xl" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
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
    <form id="login-form" className="lr-form flex flex_column" action="/api/login" method="POST">
      <label className="mks-input-label" htmlFor="email">Email</label>
      <input type="text" className="mks-input" name="email" />
      <label className="mks-input-label" htmlFor="email">Password</label>
      <input type="password" className="mks-input" name="password" />

      <input type="submit" className="btn btn-primary" value="Login" />
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
    <form id="registration-form" className="lr-form flex flex_column" action="/api/register" method="POST">
      <label className="mks-input-label" htmlFor="email">Email</label>
      <input type="email" className="mks-input" name="email" />

      <label className="mks-input-label" htmlFor="email">Username</label>
      <input type="text" className="mks-input" name="username" />
      
      <div className="flex flex_row">
      <label className="mks-input-label" htmlFor="email">Password</label>
      <InputCounter elem_id="lr-password" min={8} />
      </div>
      <input id="lr-password" type="password" className="mks-input" name="password" />

      <div className="flex flex_row">
      <label className="mks-input-label" htmlFor="email">Confirm Password</label>
      <InputCounter elem_id="lr-password-confirm" min={8} />
      </div>
      <input id="lr-password-confirm" type="password" className="mks-input" name="password-confirm" />
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
  )
}