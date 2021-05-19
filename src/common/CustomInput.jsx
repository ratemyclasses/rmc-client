import React from 'react';
import { useField } from 'formik';

export default function CustomInput({ label, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="appearance-none rounded-none relative block w-full px-3 mt-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 sm:text-sm">{meta.error}</div>
      ) : null}
    </>
  );
}
