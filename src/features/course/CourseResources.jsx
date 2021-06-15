import { CogIcon } from '@heroicons/react/outline';
import React from 'react';

export function CourseResources({ resources, compare }) {
  const renderEmptyMessage = () => {
    if (compare) {
      return (
        <span className="px-2 py-2 flex items-center text-xs rounded-lg font-semibold text-gray-500 bg-gray-50">
          Inadequate Data
        </span>
      );
    }

    return <p className="text-gray-500">Be the first one to share this course’s resources</p>;
  };
  return (
    <div>
      {compare ? (
        <></>
      ) : (
        <div className="flex items-center mb-4">
          <span className="rounded-xl relative p-2 bg-purple-200">
            <CogIcon className="h-5 w-5 text-indigo-600" />
          </span>
          <p className="text-md text-gray-900 dark:text-white ml-2">Resources</p>
        </div>
      )}
      <div className={`flex flex-wrap items-center justify-${compare ? 'center' : 'start'} gap-2`}>
        {resources.length
          ? resources.map((resource) => (
              <ResourcePill key={resource} label={resource} small={!compare} />
            ))
          : renderEmptyMessage()}
      </div>
    </div>
  );
}

function ResourcePill({ label, small }) {
  return (
    <span
      className={`px-2 py-1 flex items-center text-${
        small ? 'xs' : 'sm'
      } rounded-lg font-semibold text-blue-500 bg-blue-50`}
    >
      {label}
    </span>
  );
}

// https://discord.com/invite/DU3yQ3Tn
