/*eslint-disable */
import { ChartBarIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../app/actions/course.actions';

export function BookmarkedCoursesView() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const courseFromState = useSelector((state) => state.course.course);
  const college = useSelector((state) => state.college.college);
  console.log(user.bookmarkedCourses);
  const allBookmarkedCourses = user.bookmarkedCourses.map((courseId) => {
    dispatch(getCourseById({ collegeId: college._id, id: courseId }));
    return courseFromState;
  });
  return (
    <div className="container flex w-full items-center">
      <ul className="flex flex-col bg-white-300 p-4">
        {allBookmarkedCourses.map((course) => {
          return (
            <li className="border-indigo-400 flex flex-row mb-2 w-200">
              <div className="select-none cursor-pointer bg-indigo-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex flex-col rounded-md w-10 h-10 bg-indigo-300 justify-center items-center mr-4">
                  <ChartBarIcon />
                </div>
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium">
                    {course.abbreviation} {course.number}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
