/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { WizardForm } from '../../common/WizardForm';
import { LoginForm } from '../auth/LoginForm';

const options = [
  'Textbook',
  'Lecture Notes',
  'Course Website',
  'Office Hours',
  'Lots of TAs',
  'Other'
];

export function CreateReviewForm({ setOpen, setSuccess }) {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <>{authenticated ? <WizardForm setOpen={setOpen} setSuccess={setSuccess} /> : <LoginForm />}</>
  );
}
