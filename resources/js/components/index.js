import React from 'react';
import ReactDOM from 'react-dom';


function Index(props) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                        <div className="card-body">Logged In status: {props.isLoggedIn}</div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Index;

console.log('hi');



ReactDOM.render(<Index isLoggedIn="1" />, document.getElementById('react-body'));
ReactDOM.render(<Index isLoggedIn="1" />, document.getElementById('react-footer'));

if (document.getElementById('react-hook')) {
}
