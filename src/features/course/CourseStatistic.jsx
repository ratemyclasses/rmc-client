import { AdjustmentsIcon, ClockIcon } from '@heroicons/react/outline';
import React from 'react';
import { capitalize, rounded } from '../utils';

export function CourseStatistic({ field, value, subtext }) {
  const fields = {
    difficulty: {
      icon: <ClockIcon className="h-5 w-5 text-indigo-600" />,
      subtext: <span className="text-sm">/5</span>
    },
    workload: {
      icon: <AdjustmentsIcon className="h-5 w-5 text-indigo-600" />,
      subtext: <span className="text-sm ml-2">hours/week</span>
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <span className="rounded-xl relative p-2 bg-purple-200">{fields[field].icon}</span>
        <p className="text-md text-gray-900 dark:text-white ml-2">{capitalize(field)}</p>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-gray-900 dark:text-gray-100 text-4xl text-left font-bold my-4">
          {value ? (
            <>
              {rounded(value)}
              {fields[field].subtext}
            </>
          ) : (
            'N/A'
          )}
        </p>
      </div>
    </div>
  );
}
