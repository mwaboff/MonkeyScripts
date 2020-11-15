import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,

} from "react-router-dom";
import RequestInterface from '../interfaces/RequestInterface';

function UserView() {
  // Have to do this functional wrapper as useParams "hook" can't be run in a class based component apparently
  let { id } = useParams();
  return (
    <UserViewMain id={ id } />
  )
}
class UserViewMain extends React.Component {

  constructor(props) {
    this.state = { 
      requested_id: props.id, 
      author_name: "Loading...", 
      author_join_date: "Loading..."
    };
  }