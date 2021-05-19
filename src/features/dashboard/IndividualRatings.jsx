import React from 'react';

export function IndividualRatings() {
  return (
    <div className="rounded-xl w-full md:w-full p-6 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-100 relative overflow-hidden">
      <a href="/" className="w-full h-full block">
        <div className="w-full">
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>Design</p>
            <p>3/8</p>
          </div>
          <div className="w-full h-2 bg-green-100 rounded-full mb-4">
            <div className="w-1/3 h-full text-center text-xs text-white bg-green-400 rounded-full" />
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>Development</p>
            <p>6/10</p>
          </div>
          <div className="w-full h-2 bg-indigo-100 rounded-full mb-4">
            <div className="w-2/3 h-full text-center text-xs text-white bg-indigo-400 rounded-full" />
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>DevOps</p>
            <p>2/8</p>
          </div>
          <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
            <div className="w-1/4 h-full text-center text-xs text-white bg-blue-400 rounded-full" />
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <p>Marketing</p>
            <p>8/8</p>
          </div>
          <div className="w-full h-2 bg-pink-100 rounded-full">
            <div className="w-full h-full text-center text-xs text-white bg-pink-400 rounded-full" />
          </div>
        </div>
      </a>
    </div>
  );
}
