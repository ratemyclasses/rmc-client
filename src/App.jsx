import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCurrentUser } from './app/actions/user.actions';
import { STATUS } from './app/constants';
import { PageNotFound } from './common/PageNotFound';
import { Auth } from './features/auth/Auth';
import { Dashboard } from './features/dashboard/Dashboard';
import { Landing } from './features/landing/Landing';
import { Profile } from './features/profile/Profile';

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated && status === STATUS.idle) {
      dispatch(getCurrentUser());
    }
  });

  return (
    <div>
      <Router>
        <Switch>
          {/* <Route path="/unauthorized" component={Unauthorized} /> */}
          <Route path="/login">
            <Auth />
          </Route>
          <Route path="/signup">
            <Auth />
          </Route>
          <Route path="/profile" component={Profile} />
          <Route path="/u/:tag" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
