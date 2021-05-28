import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ForgotPassword } from './ForgotPassword';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ResetPassword } from './ResetPassword';

export function Auth() {
  const location = useLocation();
  const authenticated = useSelector(({ auth }) => auth.authenticated);
  const history = useHistory();
  const { resetPasswordToken } = useParams();

  if (authenticated) {
    history.push('/');
  }

  const dynamicLink = `/reset-password/${resetPasswordToken || ''}`;

  const forms = {
    '/login': <LoginForm />,
    '/signup': <SignupForm />,
    '/forgot-password': <ForgotPassword />,
    [dynamicLink]: <ResetPassword />
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {forms[location.pathname]}
    </div>
  );
}
