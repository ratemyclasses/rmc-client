import React from 'react';

export function Sidenote({ label }) {
  return (
    <div className="flex max-w-sm my-4">
      <div className="w-2 bg-indigo-600 rounded-t-full rounded-b-full"> </div>
      <div className="w-auto text-grey-darker items-center p-4">
        <p className="leading-tight text-gray-500">{label}</p>
      </div>
    </div>
  );
}
