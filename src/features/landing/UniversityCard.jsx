import React from 'react';
import { Link } from 'react-router-dom';

export function UniversityCard(props) {
  return (
    <div className="p-4 md:w-1/2 text-left">
      <div className="flex rounded-lg h-full bg-white p-8 flex-col shadow-sm">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h2 className="text-gray-900 text-lg title-font font-medium">{props.name}</h2>
        </div>
        <div className="flex-grow">
          <p className="leading-relaxed text-base text-gray-500">
            Explore and add to the thousands of courses and reviews at {props.name}.
          </p>{' '}
          {/* Access props.description here */}
          <Link className="mt-3 text-indigo-500 inline-flex items-center" to={`/u/${props.tag}`}>
            Check Reviews
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
