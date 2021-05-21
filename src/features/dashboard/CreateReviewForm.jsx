/* eslint-disable */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { CustomSelect } from '../../common/CustomSelect';
import { CustomSlider } from '../../common/CustomSlider';
import { WizardForm } from '../../common/WizardForm';
import { requireAuth } from '../../common/requireAuth';

const options = [
  'Textbook',
  'Lecture Notes',
  'Course Website',
  'Office Hours',
  'Lots of TAs',
  'Other'
];

function CreateReviewForm() {
  return (
    <div>
      <WizardForm />
    </div>
  );
}

CreateReviewForm = requireAuth(CreateReviewForm);

export { CreateReviewForm };
