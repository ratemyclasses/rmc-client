import React from 'react';

export function Textarea({ field, form: { touched, errors }, label, ...props }) {
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className="resize-none w-full px-3 py-2 text-gray-900 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
        {...field}
        {...props}
      />
      {touched &&
        Object.keys(touched) &&
        touched[field.name] &&
        errors &&
        Object.keys(errors).length > 0 && (
          <div className="text-red-500 sm:text-sm">{errors[field.name]}</div>
        )}
    </>
  );
}
