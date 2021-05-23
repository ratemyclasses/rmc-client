import React from 'react';

export function AverageGradeCard({ avgLetterGrade }) {
  return (
    <div className="rounded-xl min-w-10 float-right p-3 px-4 mb-2 bg-green-500 dark:bg-gray-800 text-right">
      <div className="flex flex-row justify-start text-right items-center">
        <div className="float-left py-2 mr-2 text-white font-normal mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <p className="text-white text-2xl text-right dark:text-white font-bold">
          {avgLetterGrade || 'N/A'}
        </p>
      </div>
    </div>
  );
}
