import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../app/actions/course.actions';
import { CourseCard } from './CourseCard';

export function CourseList() {
  const courses = useSelector((state) => state.course.courses);
  const college = useSelector((state) => state.college.college);
  const dispatch = useDispatch();

  useEffect(() => {
    if (college) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [college, dispatch]);

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
