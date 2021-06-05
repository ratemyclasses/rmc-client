import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCurrentUser } from './app/actions/user.actions';
import { STATUS } from './app/constants';
import { ActivateBar } from './common/ActivateBar';
import { PageNotFound } from './common/PageNotFound';
import { requireAuth } from './common/requireAuth';
import { Auth } from './features/auth/Auth';
import { Dashboard } from './features/dashboard/Dashboard';
import { Landing } from './features/landing/Landing';
import { ModerateDashboard } from './features/moderator/ModerateDashboard';
import { Profile } from './features/profile/Profile';

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated && status === STATUS.idle) {
      dispatch(getCurrentUser());
    }
  });

  return (
    <div>
      <Router>
        {user && !user.activated && <ActivateBar />}
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={Auth} />
          <Route path="/forgot-password" component={Auth} />
          <Route path="/reset-password/:resetPasswordToken" component={Auth} />
          <Route path="/activate-account/:activationToken" component={Auth} />
          <Route path="/profile" component={requireAuth(Profile)} />
          <Route
            path="/moderate/u/:tag"
            component={requireAuth(ModerateDashboard, ['ADMIN', 'MODERATOR'])}
          />
          <Route path="/u/:tag" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
