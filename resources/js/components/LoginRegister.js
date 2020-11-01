import React from 'react';
import ReactDOM from 'react-dom';


class LoginRegister extends React.Component {
  
  render() {
    return (
      <div id="login-modal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              Modal Header!
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <LoginColumn />
                <RegisterColumn />
              </div>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary">Save changes</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
    <div className="col-md-4  ml-auto">
    left column
  </div>
  )
}

function RegisterColumn(props) {
  return(
    <div className="col-md-4  ml-auto">
    left column
  </div>
  )
}