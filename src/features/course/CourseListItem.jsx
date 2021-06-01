import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { determinePillColor, rounded } from '../utils';

export function CourseListItem({ course }) {
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <button
      onClick={() => history.push(`${url}/${course._id}`)}
      className="w-full py-2 px-2 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-purple-200 border-b"
      type="button"
    >
      <div className="overflow-ellipsis overflow-hidden relative py-4 px-4 flex items-start justify-between">
        <div className="py-2 w-2/3 text-left">
          <p className="float-left text-lg font-bold text-gray-900">
            {course.abbreviation} {course.number}
          </p>
          <p className="float-left text-md font-regular leading-5 text-gray-500 w-full truncate">
            {course.name}
          </p>
          {/* <dd className="text-gray-500 font-semibold">
                        <span>
                            Hongye Liu
                        </span>
                    </dd> */}
        </div>
        {course.reviewCount > 0 && (
          <span
            className={`px-3 py-1 flex items-center text-2xl rounded-lg font-bold text-${determinePillColor(
              rounded(course.avgRating)
            )}-500 bg-${determinePillColor(rounded(course.avgRating))}-50`}
          >
            <StarIcon className="h-6 w-6 mr-1" /> {rounded(course.avgRating)}
          </span>
        )}
      </div>
    </button>
  );
}
