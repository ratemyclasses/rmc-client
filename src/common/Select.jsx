import React, { useState } from 'react';

export const Select = ({ field, form, options, values, isMulti = false, minLabel, maxLabel }) => {
  const btnState = {};
  options.forEach((item) => {
    btnState[item.name] = values && values.includes(item.value);
  });

  const [buttons, setButtons] = useState(btnState);

  const onChange = (e, name) => {
    let newButtons = {};
    let empty = false;
    if (isMulti) {
      newButtons = { ...buttons, [e.target.innerText]: !buttons[name] };
    } else {
      Object.keys(buttons).forEach((t) => {
        if (buttons[t] && t === name) {
          empty = true;
          newButtons[t] = false;
        } else {
          newButtons[t] = t === name;
        }
      });
    }
    setButtons(newButtons);
    form.setFieldTouched(field.name);
    let value = null;
    if (isMulti) {
      value = Object.keys(newButtons)
        .filter((t) => newButtons[t])
        .map((key) => options.find((option) => key === option.name).value);
    } else if (empty) {
      value = undefined;
    } else {
      value = options.find((option) => name === option.name).value;
    }
    form.setFieldValue(field.name, value);
  };

  return (
    <div>
      {form.touched && form.errors && Object.keys(form.errors).length > 0 && (
        <div className="text-red-500 sm:text-sm">{form.errors[field.name]}</div>
      )}
      {minLabel && <span className="text-sm text-gray-600 mr-3">{minLabel}</span>}
      {Object.keys(buttons).map((name) => (
        <button
          key={name}
          className={`px-4 py-2 text-base rounded-full mr-1 mt-1 focus:outline-none ${
            buttons[name]
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'text-gray-500 hover:bg-gray-100 hover:border-indigo-100'
          }`}
          type="button"
          onClick={(e) => onChange(e, name)}
          tabIndex={-1}
        >
          {name}
        </button>
      ))}
      {maxLabel && <span className="text-sm text-gray-600 ml-3">{maxLabel}</span>}
    </div>
  );
};
