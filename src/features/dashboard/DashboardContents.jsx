import React from 'react';
import { Course } from './Course';
import { CourseList } from './CourseList';
// import { Header } from './Header';

export function DashboardContents() {
  return (
    <div className="grid grid-cols-3">
      <div className="bg-blue border-r mt-4 pr-8 mr-8 border-gray-200">
        {/* <Header /> */}
        <CourseList />
      </div>
      <div className="col-span-2 mt-4">
        <Course />
      </div>
    </div>
  );
}
