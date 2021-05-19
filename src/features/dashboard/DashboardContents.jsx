import React from 'react';
import { Course } from './Course';
import { CourseList } from './CourseList';
import { Header } from './Header';

export function DashboardContents() {
  return (
    <div className="grid grid-cols-3 ">
      <div className="col-span-3  h-32 border-b pb-16 border-gray-200">
        <Header />
      </div>
      <div className="bg-blue border-r pr-8 mr-10 border-gray-200">
        <CourseList />
      </div>
      <div className="col-span-2 bg-red">
        <Course />
      </div>
    </div>
  );
}
