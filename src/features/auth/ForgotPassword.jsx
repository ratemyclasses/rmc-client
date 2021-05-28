import * as axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { BASE_URL } from '../../app/constants';
import { Input } from '../../common/Input';

export function ForgotPassword() {
  const status = useSelector(({ auth }) => auth.status);
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await axios.patch(`${BASE_URL}/user/forgot-password`, values);
      setSubmitting(false);
      history.push('/login');
    } catch (err) {
      setError(err);
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
