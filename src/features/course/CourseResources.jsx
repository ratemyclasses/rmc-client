import { CogIcon } from '@heroicons/react/outline';
import React from 'react';

export function CourseResources({ resources }) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="rounded-xl relative p-2 bg-purple-200">
          <CogIcon className="h-5 w-5 text-indigo-600" />
        </span>
        <p className="text-md text-gray-900 dark:text-white ml-2">Resources</p>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {resources.map((resource) => (
          <ResourcePill label={resource} />
        ))}
      </div>
    </div>
  );
}

function ResourcePill({ label }) {
  return (
    <span className="px-2 py-2 flex items-center text-sm rounded-lg font-semibold text-blue-500 bg-blue-50">
      {label}
    </span>
  );
}
