import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function requireAuth(ChildComponent) {
  function ComposedComponent(props) {
    // Our component got rendered for first time
    const history = useHistory();
    const authenticated = useSelector((state) => state.auth.authenticated);

    useEffect(() => {
      if (!authenticated) {
        history.push('/login');
      }
    }, [history, authenticated]);

    return <ChildComponent {...props} />;
  }

  return ComposedComponent;
}
