import { Field, Form, Formik } from 'formik';
import React from 'react';
import { CustomSelect } from '../../common/CustomSelect';

const options = [
  'Textbook',
  'Lecture Notes',
  'Course Website',
  'Office Hours',
  'Lots of TAs',
  'Other'
];

export function CreateReviewForm() {
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <h1>Any place in your app!</h1>
      <Formik initialValues={{ example: '' }} onSubmit={onSubmit}>
        <Form>
          <Field name="example" component={CustomSelect} options={options} />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
