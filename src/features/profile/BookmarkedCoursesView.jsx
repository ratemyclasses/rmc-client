/*eslint-disable */
import { ChartBarIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourses } from '../../app/actions/course.actions';

export function BookmarkedCoursesView() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const college = useSelector((state) => state.college.college);
  if (user.bookmarkedCourses.length > 0 && college) {
    useEffect(() => {
      dispatch(
        getCourses({
          collegeId: college._id,
          params: { ids: user.bookmarkedCourses, fields: ['abbreviation', 'number'] }
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return (
      <div className="container flex w-full items-center">
        <ul className="flex flex-col bg-white-300 p-4">
          {courses.map((course) => {
            return (
              <Link to={`/u/${college.tag}/${course._id}`}>
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
              </Link>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div> Please bookmark a course and ensure you have selected a college. </div>;
  }
}
