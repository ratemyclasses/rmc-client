import { PlusCircleIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { Navbar } from '../../common/Navbar';
import { CompareActionsHeader } from './CompareActionsHeader';
import { CompareCard } from './CompareCard';
import { CourseLabels } from './CourseLabels';

export function CompareCourses() {
  const [coursesToCompare, setCoursesToCompare] = useState([]);

  const addCourse = (course) => {
    const courseList = coursesToCompare.slice();
    courseList.push(course);
    setCoursesToCompare(courseList);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="h-screen">
          <div className="py-4 flex gap-8 bg-white border-t border-b pl-4">
            <CompareActionsHeader addCourse={addCourse} />
          </div>
          <div className="flex">
            <div className="flex-none w-72 bg-white border-r h-screen overflow-y-auto">
              <CourseLabels />
            </div>
            <div className="flex">
              {coursesToCompare.map((course) => (
                <CompareCard key={course._id} course={course} />
              ))}
            </div>
            <div className="w-80">
              <div className="rounded-xl border-2 border-dashed border-gray-300 h-screen mx-4 my-4">
                <div className="mx-auto p-4 text-gray-400 inline-flex items-center justify-center">
                  Add Course <PlusCircleIcon className="ml-2 h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
