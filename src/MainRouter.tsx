import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  LoginForm,
  MessageView,
  MonitoringView,
  OrganizationView,
  PhoneView,
  StatisticsV2View,
  StatisticsView,
  UserView,
} from 'components/organisms';
import { NotFound } from 'components/pages';
import constants, { STATISTICS_VERSION } from 'utils/constants';

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginForm} />
      <Route exact path="/main/" component={MonitoringView} />
      <Route
        exact
        path="/main/manage/organization"
        component={OrganizationView}
      />
      <Route exact path="/main/manage/user" component={UserView} />
      <Route
        exact
        path="/main/manage/stat"
        component={
          constants.STATISTICS_VERSION === STATISTICS_VERSION.TWO
            ? StatisticsV2View
            : StatisticsView
        }
      />
      <Route exact path="/main/manage/message" component={MessageView} />
      <Route exact path="/main/manage/phone" component={PhoneView} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default MainRouter;
