import React from 'react';
import { Range } from 'react-range';

export function Slider({ field, form, value, step, min, max, minLabel, maxLabel }) {
  const [values, setValues] = React.useState([value || 0]);

  return (
    <div>
      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={(vals) => {
          setValues(vals);
          form.setFieldValue(field.name, vals[0]);
        }}
        renderTrack={({ props, children }) => (
          <>
            <div className="flex space-x-32">
              <span className="text-sm">{minLabel}</span>
              <span className="text-sm">{maxLabel}</span>
            </div>
            <div {...props} className="w-1/2 h-2 pr-2 my-4 bg-indigo-600 rounded-lg">
              {children}
            </div>
          </>
        )}
        renderThumb={({ props }) => (
          <>
            <div
              {...props}
              className="w-7 h-7 p-2 transform translate-x-10 bg-gray-50 bg-opacity-100 border rounded-full focus:outline-none shadow-md"
            >
              <div className="mt-7 text-lg">{values[0]}</div>
            </div>
          </>
        )}
      />
    </div>
  );
}
