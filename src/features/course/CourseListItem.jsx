import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

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
        <span className="rounded-xl px-4 py-4 bg-purple-200 float-right font-extrabold text-purple-800">
          4.5
        </span>
      </div>
    </button>
  );
}
