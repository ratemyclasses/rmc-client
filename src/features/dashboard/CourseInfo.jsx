import React from 'react';

/* eslint-disable */

export function CourseInfo() {
  const vals = [
    {
      title: 'RESOURCES',
      values: ['Helpfulness', 'Teaching Quality', 'Office Hours']
    },
    {
      title: 'DIFFICULTY',
      values: ['Workload', 'Assitance', 'People', 'Commitment']
    },
    {
      title: 'QUALITY',
      values: ['Course Website', 'Teaching Quality', 'Materials']
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {vals.map((val) => {
        return (
          <div>
            <h2 className="font-medium title-font tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left">
              {val.title}
            </h2>
            <div className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
              {val.values.map((value) => {
                return (
                  <div className="text-gray-700">
                    <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
