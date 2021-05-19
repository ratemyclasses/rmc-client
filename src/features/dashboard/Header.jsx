import React from 'react';
import { useSelector } from 'react-redux';

export function Header() {
  const college = useSelector((state) => state.college.college);

  if (!college) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:flex lg:items-center lg:justify-between mt-12">
      <div className="flex-1 min-w-0">
        <p className="text-xl font-bold text-gray-900 sm:text-2xl">
          {college ? college.longName : 'Loading...'}
        </p>
      </div>
    </div>
  );
}
