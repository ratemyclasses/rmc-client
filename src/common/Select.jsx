import React, { useState } from 'react';

export const Select = ({ field, form, options, values, isMulti = false }) => {
  const btnState = {};
  options.forEach((tag) => {
    btnState[tag] = values && values.includes(tag);
  });

  const [buttons, setButtons] = useState(btnState);

  const onChange = (e, tag) => {
    let newButtons = {};
    if (isMulti) {
      newButtons = { ...buttons, [e.target.innerText]: !buttons[tag] };
    } else {
      Object.keys(buttons).forEach((t) => {
        newButtons[t] = t === tag;
      });
    }
    setButtons(newButtons);
    form.setFieldValue(
      field.name,
      isMulti ? Object.keys(newButtons).filter((t) => newButtons[t]) : tag
    );
  };

  return Object.keys(buttons).map((tag) => (
    <button
      key={tag}
      className={`px-4 py-2 text-base rounded-full mr-1 mt-1 focus:outline-none border border-indigo-500 ${
        buttons[tag] ? 'bg-indigo-600 text-white' : 'text-indigo-500 hover:bg-indigo-100'
      }`}
      type="button"
      onClick={(e) => onChange(e, tag)}
    >
      {tag}
    </button>
  ));
};
