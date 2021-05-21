/* eslint-disable */
import React, { useState } from 'react';
import { CustomAlert } from '../../common/CustomAlert';
import { requireAuth } from '../../common/requireAuth';
import { WizardForm } from '../../common/WizardForm';

const options = [
  'Textbook',
  'Lecture Notes',
  'Course Website',
  'Office Hours',
  'Lots of TAs',
  'Other'
];

function CreateReviewForm({ setOpen, setSuccess }) {
  return (
    <>
      <WizardForm setOpen={setOpen} setSuccess={setSuccess} />
    </>
  );
}

CreateReviewForm = requireAuth(CreateReviewForm);

export { CreateReviewForm };
