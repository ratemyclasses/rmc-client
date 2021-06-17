import { TrashIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompareCourse } from '../../app/actions/course.actions';
import { CourseResources } from '../course/CourseResources';
import { SummaryColumn } from '../course/SummaryColumn';
import { determinePillColor, rounded } from '../utils';

export function CompareCard({ course }) {
  const dispatch = useDispatch();
  const college = useSelector((state) => state.college.college);

  return (
    <div className="w-96 bg-white border-r dark:bg-gray-800">
      <div className="flex items-center h-24 p-4">
        <button
          className="text-red-500 p-2 ml-2 bg-gray-50 hover:bg-gray-100 rounded-full focus:outline-none"
          onClick={() =>
            dispatch(toggleCompareCourse({ collegeId: college._id, courseId: course._id }))
          }
          type="button"
          title="Remove"
        >
          <TrashIcon className="h-4 h-4" />
        </button>
        <div className="w-48">
          <p className="text-black dark:text-white text-xl font-bold">{course.shortName}</p>
          <p className="text-gray-500 dark:text-gray-300 text-sm truncate">{course.name}</p>
        </div>
        {course.aggregate.reviewCount > 0 && (
          <span
            className={`px-3 py-1 flex items-center text-2xl rounded-lg font-bold text-${determinePillColor(
              rounded(course.aggregate.avgRating)
            )}-500 bg-${determinePillColor(rounded(course.aggregate.avgRating))}-50`}
          >
            <StarIcon className="h-6 w-6 mr-1" /> {rounded(course.aggregate.avgRating)}
          </span>
        )}
      </div>
      <p className="px-4 py-2 h-12 flex items-center font-bold text-xl mb-2 w-full border-t border-b">
        {' '}
      </p>

      <div className="text-center">
        <p className="text-black my-3 dark:text-white text-xl font-bold">
          {course.aggregate.avgDifficulty}{' '}
          <span className="text-gray-500 dark:text-gray-300 text-sm font-normal mb-4">/5</span>
        </p>
        <p className="text-black mb-3 dark:text-white text-xl font-bold">
          {course.aggregate.avgHoursPerWeek}{' '}
          <span className="text-gray-500 dark:text-gray-300 text-sm font-normal">hrs/week</span>
        </p>
        <div className="h-36">
          <CourseResources resources={course.aggregate.resources} compare />
        </div>
        <p className="px-4 py-2 h-12 flex items-center font-bold text-xl w-full border-t border-b">
          {' '}
        </p>
        <div className="py-3">
          <SummaryColumn col="Structure" aggregate={course.aggregate} compare />
        </div>
        <p className="px-4 py-2 h-12 flex items-center font-bold text-xl mb-2 w-full border-t border-b">
          {' '}
        </p>
        <div className="py-4">
          <SummaryColumn col="Assignments/Exams" aggregate={course.aggregate} compare />
        </div>
      </div>
    </div>
  );
}
