import React from 'react';
import ReactDOM from 'react-dom';


function Footer(props) {
  return (
    <footer className="footer">
      <div className="container">
        I am a footer!
      </div>
    </footer>
  );
}

export default Footer;



// ReactDOM.render(<Footer isLoggedIn="1" />, document.getElementById('react-footer'));