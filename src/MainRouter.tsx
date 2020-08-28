import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  LoginForm,
  MonitoringView,
  OrganizationView,
  UserView,
} from 'components/organisms';

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginForm} />
      <Route exact path="/main/" component={MonitoringView} />
      <Route exact path="/main/manage/organization" component={OrganizationView} />
      <Route exact path="/main/manage/user" component={UserView} />
    </Switch>
  );
}

export default MainRouter;