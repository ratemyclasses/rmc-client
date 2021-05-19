import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseCard } from './CourseCard';
import { STATUS } from '../../app/constants';
import { getCourses } from '../../app/actions/course.actions';

export function CourseList() {
  const college = useSelector((state) => state.college.college);
  const courses = useSelector((state) => state.course.courses);
  const coursesStatus = useSelector((state) => state.course.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coursesStatus === STATUS.idle) {
      dispatch(
        getCourses({
          collegeId: college._id,
          limit: 7,
          offset: 1,
          sortBy: ['abbreviation:1', 'number:1'],
          fields: ['name', 'abbreviation', 'number']
        })
      );
    }
  });

  console.log(coursesStatus, courses, college);

  if (!courses.length) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="mt-4 mb-8">
      <input
        type="text"
        id="rounded-email"
        className=" rounded-lg border-transparent flex-1 appearance-none border md:w-full py-4 px-8 sm:w-full bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent mb-4"
        placeholder="Search course..."
      />

      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
