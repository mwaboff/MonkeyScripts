import React from 'react';
import ReactDOM from 'react-dom';


function Footer(props) {
    return (
        <div className="container">
            <p>I am a footer!</p>
        </div> 
    );
}

// export default Index;


ReactDOM.render(<Footer isLoggedIn="1" />, document.getElementById('react-footer'));