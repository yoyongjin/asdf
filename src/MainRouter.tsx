import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  LoginForm,
  Monitoring,
  Organization,
  User,
} from 'components/organisms';

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginForm} />
      <Route exact path="/main/" component={Monitoring} />
      <Route exact path="/main/manage/organization" component={Organization} />
      <Route exact path="/main/manage/user" component={User} />
    </Switch>
  );
}

export default MainRouter;
