/* eslint-disable */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../common/Input';
import { updateUser } from '../../app/actions/user.actions';
import { ResetPasswordProfile } from './ResetPasswordProfile';

export function EditProfile({}) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const labels = [
    { label: 'Email', key: 'email' },
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Display Name', key: 'displayName' }
  ];

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(updateUser(values));
    setSubmitting(false);
  };

  if (!user) {
    return <div> Loading .. </div>;
  }

  return (
    <div className="w-3/4">
      <Formik
        initialValues={{
          email: user.email,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          displayName: user.displayName || ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string('Invalid. Must only have letters')
            .matches(/^[A-Za-z]+$/, 'Invalid. Must only have letters')
            .nullable(),
          lastName: Yup.string('Invalid. Must only have letters')
            .matches(/^[A-Za-z]+$/, 'Invalid. Must only have letters')
            .nullable(),
          email: Yup.string().email().nullable()
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <h2 className="mt-6 mb-2 font-bold">Personal Information </h2>
          <div className="mr-2 overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                {labels.map((item) => {
                  return (
                    <div className="col-span-6 sm:col-span-3" key={item.label}>
                      <h3 className="mb-3 text-s font-bold">{item.label}</h3>
                      <Field
                        name={item.key}
                        id={item.key}
                        type="text"
                        component={Input}
                        label=""
                        placeholder={item.label}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="mb-3 ml-5 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
      <h2 className="mt-6 mb-3 font-bold">Change Password </h2>

      <ResetPasswordProfile>Reset Password </ResetPasswordProfile>

      <h2 className="mt-6 mb-3 font-bold">Remove your Account </h2>
      <button
        type=""
        className="mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Delete Account
      </button>
    </div>
  );
}
