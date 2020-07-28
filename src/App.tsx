import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthPage, MainPage, NotFound } from 'components/pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/auth/login" />} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/main" component={MainPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
