import { useField } from 'formik';
import React, { useState } from 'react';

export function Input({ form, field, label, value, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [val, setVal] = useState(value || '');
  /* eslint-disable-next-line */
  const [_, meta] = useField(props);

  const onChange = (e) => {
    setVal(e.target.value);
    form.setFieldValue(field.name, e.target.value);
  };

  return (
    <>
      <label className="sr-only" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="appearance-none rounded-none relative block w-full px-3 mt-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        {...field}
        {...props}
        value={val}
        onChange={onChange}
      />
      {meta.touched && meta.error && Object.keys(meta.error).length > 0 && (
        <div className="text-red-500 sm:text-sm">{meta.error[field.name]}</div>
      )}
    </>
  );
}
