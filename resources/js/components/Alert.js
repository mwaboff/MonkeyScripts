import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header.js';
import '../../css/Alert.css';



export class Alert {

  static setBadInput(input_elem, message) {
    input_elem.classList.add("bad-input");
    let warning_node = document.createElement('div');
    warning_node.classList.add('bad-input-error');
    warning_node.innerText = message;
    input_elem.parentNode.insertBefore(warning_node, input_elem);
  }

  static removeAllBadInput() {
    let bad_inputs = document.querySelectorAll(".bad-input");
    let bad_input_errors = document.querySelectorAll(".bad-input-error");

    bad_inputs.forEach((elem) => elem.classList.remove("bad-input"));
    bad_input_errors.forEach((elem) => elem.remove());
  }
}

export function NoPermission(props) {
  let history = useHistory();
  return (
    <>
    <Header
      title="Uh-oh"
      subtitle="Something went wrong!"
    />
    <div className="container flex flex_center-full alert-no-permission">
      <h1>Sorry! You do not have permission to edit this page.</h1>
      <ReturnToLastPage history={ history } />
    </div>
    </>
  )
}

class  ReturnToLastPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {history: props.history };
  }

  componentDidMount() {
    document.getElementById('return-btn').addEventListener('click', this.goBack.bind(this))
  }

  goBack(e) {
    e.preventDefault();
    this.state.history.goBack();
  }


  render() {
    return (
      <Link id="return-btn" to="/" className="mks-tile alert-return-btn">Return to Safety</Link>
    )
  }
}