import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Home from './components/Home.js';
import About from './components/About.js';
import Tutorial from './components/Tutorial.js';
import ScriptModify from './components/ScriptModify.js';
import ScriptView from './components/ScriptView.js';
// import UserContext from './interfaces/AuthInterface.js';


import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";


const UserContext = React.createContext({
  current_username: '',
  current_uid: -1
});


function Router(props) {
  const user_info = React.useContext(UserContext);
  return (
    <>
    <div>{user_info.current_uid}</div>
    <UserContext.Provider>

      <BrowserRouter>
        <Header />

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


          <Route path="/admin"></Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  </>
  )
}

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

ReactDOM.render(<Router isLoggedIn="1" />, document.getElementById('app'));