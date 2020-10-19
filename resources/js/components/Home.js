import React from 'react';
import ReactDOM from 'react-dom';

console.log('hi there');
class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <IntroBanner />
            </div>
        )
    }
}

function IntroBanner(props) {
    return (
    <div className="jumbotron">
        <div>
            <h1>What are user scripts? How can they help?</h1>
            <h4>User scripts are small browser extensions that can add features and fix bugs on your favorite sites!</h4>
        </div>
    </div>
    )
}

ReactDOM.render(<Home isLoggedIn="1" />, document.getElementById('react-body'));
