import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { hasRoles } from '../features/utils';

export function requireAuth(ChildComponent, roles = []) {
  function ComposedComponent(props) {
    // Our component got rendered for first time
    const history = useHistory();
    const authenticated = useSelector((state) => state.auth.authenticated);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
      if (!authenticated) {
        history.push('/login');
      }
    }, [history, authenticated]);

    if (user) {
      if (roles.length && !hasRoles(user.roles, roles)) {
        history.goBack();
      } else {
        return <ChildComponent {...props} />;
      }
    }

    return <div>Loading...</div>;
  }

  return ComposedComponent;
}
