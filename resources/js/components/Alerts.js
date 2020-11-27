import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header.js';


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

class  ReturnToLastPage extends Component {
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