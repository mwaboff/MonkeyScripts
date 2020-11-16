import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Home from './components/Home.js';
import About from './components/About.js';
import Tutorial from './components/Tutorial.js';
import ScriptModify from './components/ScriptModify.js';
import ScriptView from './components/ScriptView.js';
import UserView from './components/UserView.js';
import SearchView from './components/SearchView.js';

import UserContext from './contexts/UserContext.js';


import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";


function Router(props) {
  return (
    <>
      <BrowserRouter>
        <UserContext.Consumer>
          {(value) => (<Header setLoggedOut={ value.setLoggedOut } setLoggedOut={ value.setLoggedOut } />)}
        </UserContext.Consumer>

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

          <Route exact path="/script/:id">
            <ScriptView />
          </Route>

          <Route exact path="/script/:id/edit">
            <ScriptModify />
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
  </>
  )
}

export default Router;

function ScriptRouter(props) {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path="${path}/new" >
          <div>hi there222</div>
          <ScriptModify />
        </Route>
                  
        <Route path={"${path}/:id"}>
          <div>yoo</div>
        </Route>

      </Switch>
    </div>

  )
}

