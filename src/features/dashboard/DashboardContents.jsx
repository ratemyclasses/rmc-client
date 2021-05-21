import React from 'react';
import { Course } from './Course';
import { CourseList } from './CourseList';
import { Header } from './Header';

export function DashboardContents() {
  return (
    <div>
      <Header />
      <div className="flex items-start justify-between">
        <div className="w-full border-r border-gray-200 sm:w-64 lg:w-96">
          <CourseList />
        </div>
        <div className="hidden sm:w-full sm:block bg-white">
          <Course />
        </div>
      </div>
    </div>
  );
}
