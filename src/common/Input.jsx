import React from 'react';

export function Input({ label, field, form: { touched, errors }, ...props }) {
  return (
    <>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="appearance-none rounded-none relative block w-full px-3 mt-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...field}
        {...props}
      />
      {touched && errors && Object.keys(errors).length > 0 && (
        <div className="text-red-500 sm:text-sm">{errors[field.name]}</div>
      )}
    </>
  );
}
