import React from 'react';
import ReactDOM from 'react-dom';


function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        I am a footer!
      </div>
    </div>
  );
}


ReactDOM.render(<Footer isLoggedIn="1" />, document.getElementById('react-footer'));