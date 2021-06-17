import React from 'react';

export function CourseLabels() {
  return (
    <div className="">
      <div className="gap-4 mt-24 mt-1">
        <p className="px-6 py-2 h-12 flex items-center font-bold text-xl mb-2 w-full border-t border-b">
          Key Metrics{' '}
        </p>
        <p className="px-6 text-gray-500 text-md my-3">Difficulty</p>
        <p className="px-6 text-gray-500 text-md mb-3">Workload</p>
        <p className="px-6 text-gray-500 text-md h-36">Resources</p>
      </div>
      <div className="gap-4 mb-8">
        <p className="px-6 py-2 h-12 flex items-center font-bold text-xl mb-2 w-full border-t border-b">
          Course Structure{' '}
        </p>
        <p className="px-6 text-gray-500 text-md my-3">Professor Responsiveness</p>
        <p className="px-6 text-gray-500 text-md mb-3">Course Staff</p>
        <p className="px-6 text-gray-500 text-md mb-3">Attendance Mandatory</p>
      </div>
      <div className="gap-4">
        <p className="px-6 py-2 h-12 flex items-center font-bold text-xl mb-2 w-full border-t border-b">
          Assignments/Exams{' '}
        </p>
        <p className="px-6 text-gray-500 text-md mb-2">Exam Difficulty</p>
        <p className="px-6 text-gray-500 text-md mb-2">Quiz Frequency</p>
        <p className="px-6 text-gray-500 text-md mb-2">Project Heavy</p>
        <p className="px-6 text-gray-500 text-md mb-2">Fair Deadlines</p>
      </div>
    </div>
  );
}
