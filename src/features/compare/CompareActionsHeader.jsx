import { PlusCircleIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { CourseDropDown } from './CourseDropDown';

export function CompareActionsHeader({ addCourse }) {
  const [selectedCourse, setSelectedCourse] = useState({ name: 'Select Course' });
  return (
    <>
      <CourseDropDown selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      <button
        onClick={() => addCourse(selectedCourse)}
        type="button"
        className=" rounded-lg bg-indigo-600 text-lg px-4 py-2 text-white inline-flex items-center justify-center"
      >
        Add Course <PlusCircleIcon className="ml-2 w-5 h-5" />
      </button>
    </>
  );
}
