/* eslint-disable */
import * as axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { BASE_URL } from '../../app/constants';
import { Input } from '../../common/Input';

export function ResetPasswordProfile() {
  const user = useSelector((state) => state.user.user);
  const email = user.email;
  const history = useHistory();
  const [error, setError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.patch(`${BASE_URL}/user/reset-password-by-email`, {
        ...values,
        email: user.email
      });
      setSubmitting(false);
      history.push('/profile');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      {(!error || error.statusCode !== 404) && (
        <Formik
          enableReinitialize
          initialValues={{
            oldPassword: '',
            newPassword: ''
          }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="overflow-hidden sm:rounded-md px-10 py-8 bg-white sm:p-6">
                {email && (
                  <>
                    <div>
                      <Field
                        id="old-password"
                        name="oldPassword"
                        type="password"
                        required
                        placeholder="Old Password"
                        component={Input}
                      />
                    </div>
                    <div>
                      <Field
                        id="new-password"
                        name="newPassword"
                        type="password"
                        required
                        placeholder="New Password"
                        component={Input}
                      />
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm">
                    <div className="text-red-500">
                      {error && error.statusCode === 400 && 'Old password is incorrect'}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
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
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
