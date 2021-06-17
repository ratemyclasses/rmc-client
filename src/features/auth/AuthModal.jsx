/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Modal } from '../../common/Modal';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export function AuthModal({ open }) {
  const [openAuth, setOpenAuth] = useState(false);
  const [signup, setSignup] = useState(false);
  useEffect(() => setOpenAuth(open), [open]);
  const AuthForm = signup ? (
    <SignupForm setSignup={setSignup} setOpen={setOpenAuth} />
  ) : (
    <LoginForm setSignup={setSignup} setOpen={setOpenAuth} />
  );

  return (
    <Modal open={openAuth} setOpen={setOpenAuth} width="md">
      <>{AuthForm}</>
    </Modal>
  );
}
