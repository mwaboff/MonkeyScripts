import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Home from './components/Home.js';
import About from './components/About.js';
import About2 from './components/About2.js';
import ScriptModify from './components/ScriptModify.js';



import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

const UserContext = React.createContext({
  current_username: '',
  current_uid: -1
});

function Router(props) {
  return (
    <UserContext.Provider>

      <BrowserRouter>
        <Header />

        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/script">
            <ScriptModify />
          </Route>

          <Route path="/about2">
            <About2 />
          </Route>

          <Route path="/admin"></Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
    </UserContext.Provider>

  )
}


ReactDOM.render(<Router isLoggedIn="1" />, document.getElementById('app'));