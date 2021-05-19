import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function Auth() {
  const location = useLocation();
  const authenticated = useSelector(({ auth }) => auth.authenticated);
  const history = useHistory();

  if (authenticated) {
    history.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {location.pathname === "/login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
