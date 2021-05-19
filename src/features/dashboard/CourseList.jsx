import React from 'react';
import { CourseCard } from './CourseCard';

export function CourseList() {
  return (
    <div className="mt-4 mb-8">
      <input
        type="text"
        id="rounded-email"
        className=" rounded-lg border-transparent flex-1 appearance-none border md:w-full py-4 px-8 sm:w-full bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent mb-4"
        placeholder="Search course..."
      />

      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  );
}
