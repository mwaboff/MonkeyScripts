import React from 'react';
import { useEffect } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

import Home from './components/Home.js';
import About from './components/About.js';
import Footer from './components/Footer.js';
import Tutorial from './components/Tutorial.js';
import UserView from './components/UserView.js';
import ScriptView from './components/ScriptView.js';
import SearchView from './components/SearchView.js';
import ScriptModify from './components/ScriptModify.js';
import LoginRegister from './components/LoginRegister.js';

import UserContext from './contexts/UserContext.js';

function Router(props) {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/tutorial">
            <Tutorial />
          </Route>

          <Route exact path="/script/new">
            <ScriptModify />
          </Route>

          <Route exact path="/script/:id/edit">
            <ScriptModify />
          </Route>

          <Route exact path="/script/:id/:display">
            <ScriptView />
          </Route>

          <Route exact path="/script/:id">
            <ScriptView />
          </Route>

          

          <Route exact path="/user/:id">
            <UserView />
          </Route>

          <Route exact path="/search">
            <SearchView />
          </Route>

          <Route path="/admin"></Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
      <UserContext.Consumer>
        {(value) => (<LoginRegister setLoggedIn={ value.setLoggedIn } user={ value.user } type="login" />)}
      </UserContext.Consumer>
      <UserContext.Consumer>
        {(value) => (<LoginRegister setLoggedIn={ value.setLoggedIn } user={ value.user } type="register" />)}
      </UserContext.Consumer>
  </>
  )
}

export default Router;


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}