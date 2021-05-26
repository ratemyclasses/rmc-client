import React, { useState } from 'react';

export const Select = ({ field, form, options, values, isMulti = false }) => {
  const btnState = {};
  options.forEach((item) => {
    btnState[item.name] = values && values.includes(item.value);
  });

  const [buttons, setButtons] = useState(btnState);

  const onChange = (e, name) => {
    let newButtons = {};
    if (isMulti) {
      newButtons = { ...buttons, [e.target.innerText]: !buttons[name] };
    } else {
      Object.keys(buttons).forEach((t) => {
        newButtons[t] = t === name;
      });
    }
    setButtons(newButtons);
    form.setFieldValue(
      field.name,
      isMulti
        ? Object.keys(newButtons)
            .filter((t) => newButtons[t])
            .map((key) => options.find((option) => key === option.name).value)
        : options.find((option) => name === option.name).value
    );
  };

  return Object.keys(buttons).map((name) => (
    <button
      key={name}
      className={`px-4 py-2 text-base rounded-full mr-1 mt-1 focus:outline-none border border-indigo-500 ${
        buttons[name] ? 'bg-indigo-600 text-white' : 'text-indigo-500 hover:bg-indigo-100'
      }`}
      type="button"
      onClick={(e) => onChange(e, name)}
    >
      {name}
    </button>
  ));
};
