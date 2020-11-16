import React from 'react';
import ReactDOM from 'react-dom';
import AuthInterface from '../interfaces/AuthInterface';


class LoginRegister extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      setLoggedIn: props.setLoggedIn
    }
  }

  componentDidMount() {
    let login_form = document.getElementById('login-form');
    login_form.addEventListener('submit', this.submitLogin.bind(this));

    let register_form = document.getElementById('registration-form');
    register_form.addEventListener('submit', this.submitRegistration.bind(this));
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
    console.log("in LoginRegister.manageLogin");
    console.log("current response:");
    console.log(response);
    if(response['user_id']) {
      console.log("there is a UID");
      this.state.setLoggedIn(response['user_name'], response['user_id']);
    }
  }

  render() {
    return (
      <div id="login-modal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            <div className="modal-body">
              <div className="container-fluid">
                <LoginColumn />
                <RegisterColumn />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default LoginRegister;

function LoginColumn(props) {
  return(
    <div className="col-md-6  ml-auto">
      <form id="login-form" className="login-registration-form" action="/api/login" method="POST">
          <LoginRegisterFormField field_name="email" />
          <LoginRegisterFormField field_name="password" />
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  )
}

function RegisterColumn(props) {
  return(
    <div className="col-md-6  ml-auto">
      <form id="registration-form" action="/api/register" method="POST">
        <LoginRegisterFormField field_name="username" />
        <LoginRegisterFormField field_name="email" />
        <LoginRegisterFormField field_name="password" />
        <LoginRegisterFormField field_name="password-confirm" label="Confirm Password"/>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  )
}

function LoginRegisterFormField(props) {
  return (
    <div>
      <label>{ props.label ? props.label:props.field_name }</label>
      <input className="login-inputs form-control" name={props.field_name}></input>
    </div>

  )
}