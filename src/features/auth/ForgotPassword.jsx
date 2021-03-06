import * as axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { BASE_URL } from '../../app/constants';
import { Input } from '../../common/Input';

export function ForgotPassword() {
  const history = useHistory();
  const [error, setError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.patch(`${BASE_URL}/user/forgot-password`, values);
      setSubmitting(false);
      history.push('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
      </div>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required')
        })}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Field
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  component={Input}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="text-red-500">{error && 'An internal error occurred'}</div>
              </div>
              <div className="text-sm my-3">
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Back to Login
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
