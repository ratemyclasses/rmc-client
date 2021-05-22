import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { signup } from '../../app/actions/auth.actions';
import { STATUS } from '../../app/constants';
import { Input } from '../../common/Input';

export function SignupForm() {
  const status = useSelector(({ auth }) => auth.status);
  const dispatch = useDispatch();

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(signup(values));
    setSubmitting(false);
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .required('No password provided.')
            .min(5, 'Password is too short - should be 5 chars minimum.')
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
            <div>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                component={Input}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <div className="text-red-500">
                {status === STATUS.failed && 'Account already exists'}
              </div>
            </div>
            <div className="text-sm my-3">
              Already have an account?
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-3">
                Log In
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
