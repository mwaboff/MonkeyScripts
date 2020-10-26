import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Home from './components/Home.js';
import About from './components/About.js';



import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Router(props) {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/script">

        </Route>
        <Route path="/admin">

        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  )
}



// ReactDOM.render(<Header isLoggedIn="1" />, document.getElementById('react-header'));
ReactDOM.render(<Router isLoggedIn="1" />, document.getElementById('app'));
// ReactDOM.render(<Footer isLoggedIn="1" />, document.getElementById('react-footer'));