import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

console.log(document);
if (document.getElementById('example')) {
    console.log('example id is here!');
    ReactDOM.render(<Example />, document.getElementById('example'));
} else {
    console.log("hmm this apparently doesn't exist:");
    console.log(document.getElementById('example'));
}
