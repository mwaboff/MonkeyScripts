import React from 'react';
import ReactDOM from 'react-dom';


function Footer(props) {
  return (
    <footer className="footer">
      <div className="container">
        © Michael Aboff, 2020
      </div>
    </footer>
  );
}

export default Footer;



// ReactDOM.render(<Footer isLoggedIn="1" />, document.getElementById('react-footer'));