import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import NotFound from './NotFound/View';
import Root from 'containers/Root';
import Core from './Core/Route';
import Dashboard from './Dashboard/Route';
import Login from './Login/Route';
import Signup from './Signup/Route';
import Reservations from './Reservations/Route';
import NewReservation from './Reservations/routes/NewReservation/Route';
import Reservation from './Reservations/routes/Reservation/Route';
import User from './Users/Route';
import NewUser from './Users/routes/NewUser/Route';
import authenticated from 'containers/Authenticated';
import unauthenticated from 'containers/Unauthenticated';

export default (store) => (
  <Route path="/" component={Root}>
    <Route component={authenticated(Core)}>
      <IndexRoute component={Dashboard} />
      <Route path="/app/reservation" component={Reservations} />
      <Route path="/app/reservation/new" component={NewReservation} />
      <Route path="/app/reservation/:id" component={Reservation} />
      <Route path="/app/user" component={User} />
      <Route path="/app/user/new" component={NewUser} />
    </Route>
    <Route component={unauthenticated(Core)}>
      <Route path="/app/signup" component={Signup} />
      <Route path="/app/login" component={Login} />
    </Route>
    <Route path="/app/404" component={NotFound} />
    <Redirect from="*" to="/app/404" />
  </Route>
);
