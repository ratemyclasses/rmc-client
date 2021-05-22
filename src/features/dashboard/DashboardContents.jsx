import React from 'react';
import { Course } from '../course/Course';
import { CourseList } from './CourseList';
import { Header } from './Header';

export function DashboardContents() {
  return (
    <div>
      <Header />
      <div className="flex items-start justify-between">
        <div className="hidden sm:block w-full border-r border-gray-200 sm:w-64 lg:w-96">
          <CourseList />
        </div>
        <div className="block w-full sm:w-full sm:block bg-white">
          <Course />
        </div>
      </div>
    </div>
  );
}
