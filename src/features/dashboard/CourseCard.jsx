import React from 'react';
import { useDispatch } from 'react-redux';
import { getCourseById } from '../../app/actions/course.actions';

export function CourseCard({ course }) {
  const dispatch = useDispatch();

  return (
    <button
      className="w-full focus:outline-none focus:ring focus:ring-purple-200 rounded-lg"
      onClick={() => dispatch(getCourseById(course._id))}
      type="button"
    >
      <div className="bg-white hover:bg-gray-200 overflow-hidden shadow-sm rounded-lg relative py-4 px-4">
        <dl className="py-2">
          <dd className="float-left text-md font-semibold text-gray-900">
            {course.abbreviation}, {course.number}
          </dd>
          <dt className="float-left text-sm leading-5 text-gray-500 truncate">{course.name}</dt>
          {/* <dd className="text-gray-500 font-semibold">
                        <span>
                            Hongye Liu
                        </span>
                    </dd> */}
        </dl>
        <span className="rounded-xl px-4 py-4 bg-purple-200 float-right font-extrabold text-purple-800">
          4.5
        </span>
      </div>
    </button>
  );
}
