import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  AuthPage,
  MainPage,
  NotFound,
  PasswordChangedPage,
} from 'components/pages';
import Communicator from 'lib/communicator';

function App() {
  useEffect(() => {
    // 객체 생성
    Communicator.getInstance().create();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/user" component={PasswordChangedPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
