import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';

import { SocketProvider } from 'hooks/useSocket';
import Chat from 'pages/Chat';
import Login from 'pages/Login';

function App() {
  return (
    <SocketProvider>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="login" />} />
          <Route path="/login" component={Login} />
          <Route path="/chat/:room" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </SocketProvider>
  );
}

export default App;
